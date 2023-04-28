import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPosts, votePost, deletePost } from '../../api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Post from '../Post/Post'
import SortingHeader, { SortType } from '../Header/SortingHeader/SortingHeader'

import './Feed.css'
import Container from '../Container/Container'
import { IPost } from '../../api'
import useIsInViewport from '../../useIsInViewport'

const LIMIT = 1

export default function Feed() {
  const [sortBy, setSortBy] = useState<SortType>("date")
  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const lastRef = useRef<HTMLDivElement>(null)
  const endInViewport = useIsInViewport(lastRef);

  useEffect(() => {
    if(!endInViewport) return
    
    fetchPosts(sortBy, posts.length, LIMIT)
    .then((response) => {
        setPosts(prev => prev.concat(response.data))
        setLoading(false)
    })
    .catch((error) => console.log(error))
  }, [endInViewport, posts.length, sortBy])


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
