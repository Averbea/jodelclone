import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPost, deletePost, fetchPosts, votePost } from '../../api'
import { useFetchAndUpdateArrOnScroll } from '../../hooks/useFetchAndUpdateArrOnScroll'
import Container from '../Container/Container'
import SortingHeader, { SortType } from '../Header/SortingHeader/SortingHeader'
import Post from '../Post/Post'
import './Feed.css'

export default function Feed() {
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  function updatePosts(){
    fetchPosts(sortBy, posts.length)
    .then((response) => {
        setPosts(prev => prev.concat(response.data))
        setLoading(false)
    })
  }

  const {lastRef} = useFetchAndUpdateArrOnScroll(posts, updatePosts)


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
      <SortingHeader active={sortBy} setActive={changeSortBy} />
      <Container>
        {postContent}
        {loading && "loading"}
        <button className="createButton" onClick={() => navigate("/createPost")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div ref={lastRef} />
      </Container>
    </>
  )
}
