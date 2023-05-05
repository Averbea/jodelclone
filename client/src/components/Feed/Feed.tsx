import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPost, deletePost, fetchPosts, votePost } from '../../api'
import { useFetchAndUpdateArrOnScroll } from '../../hooks/useFetchAndUpdateArrOnScroll'
import Container from '../Container/Container'
import SortingHeader, { SortType } from '../Header/SortingHeader'
import Post from '../Post/Post'
import CreateButton from '../CreateButton/CreateButton'

interface Props {
  channel?: string
}

export default function Feed({ channel }: Props) {
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  function updatePosts() {
    fetchPosts(sortBy, posts.length, undefined, channel)
      .then((response) => {
        setPosts(prev => prev.concat(response.data))
        setLoading(false)
      })
  }

  const { lastRef } = useFetchAndUpdateArrOnScroll(posts, updatePosts)


  const vote = async (postId: string, v: "up" | "down") => {
    const response = await votePost(postId, v)
    const newPost: IPost = response.data
    setPosts((old) => old.map(prev => {
      if (prev._id === newPost._id) {
        return newPost
      } else {
        return prev
      }
    }))

  }

  const deleteThisPost = async (postId: string) => {
    const response = await deletePost(postId)
    if (response instanceof Error) {
      return
    }
    setPosts((prev) => prev.filter(post => post._id !== postId))
  }

  const postContent = posts.map((post: any) =>
    <Post key={post._id} postData={post} onVotePost={vote} onDeletePost={deleteThisPost} onClick={() => navigate(`/posts/${post._id}`)} />
  )

  const changeSortBy = (sort: SortType) => {
    setPosts([])
    setSortBy(sort)
  }

  return (
    <>
      <SortingHeader active={sortBy} setActive={changeSortBy} displayBackButton={channel != null} />
      <Container>
        {postContent}
        {loading && "loading"}
        <CreateButton onClick={() => navigate("/createPost")} />
        <div ref={lastRef} />
      </Container>
    </>
  )
}
