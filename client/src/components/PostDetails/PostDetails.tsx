import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader/BackHeader'
import Container from '../Container/Container'

import { deletePost, fetchPost, getCommentsForPost, IComment, IPost, votePost } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../Post/Post'
import Comment from '../Post/Comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


import './PostDetaills.css'

export default function PostDetails() {
  const [post, setPost] = useState<IPost | null>(null)
  const [comments, setComments] = useState<IComment[]>([])

  let { id } = useParams()

  let navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    fetchPost(id).then(
      (response) => {
        setPost(response.data)
      }
    )
    getCommentsForPost(id).then(
      (res) => setComments(res.data.comments)
    )

  }, [id])


  const commentComponents = comments.map((c) => {
    return <Comment key={c._id} commentData={c} />
  })

  const vote = async (postId: string, v: "up" | "down") => {
    const response = await votePost(postId, v)
    const newPost: IPost = response.data
    setPost(newPost)
  }

  const onDeletePost = async (postId: string) => {
    await deletePost(postId)
    navigate(-1)
  }
  return (
    <>
      <BackHeader />
      <Container>
        {post && <Post postData={post} onDeletePost={onDeletePost} onVotePost={vote} />}
        <>
          {commentComponents}
        </>

        <button className="createCommentButton" onClick={() => navigate("./comment")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </Container>
    </>
  )
}
