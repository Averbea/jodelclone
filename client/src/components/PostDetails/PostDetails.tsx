import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader/BackHeader'
import Container from '../Container/Container'

import { apiDeleteComment, apiVoteComment, deletePost, fetchPost, getCommentsForPost, IComment, IPost, votePost } from '../../api'
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


  async function voteComment(commentId: string, vote: "up" | "down") {
    if (!post) return
    let response = await apiVoteComment(post._id, commentId, vote)
    let newComment = response.data
    setComments(prev => prev.map((c => c._id === newComment._id ? newComment : c)))
  }

  async function deleteComment(commentId: string) {
    if (!post) return
    await apiDeleteComment(post._id, commentId)
    setComments((prev) => prev.filter((comment) => comment._id !== commentId))
    setPost(prev => prev ? { ...prev, commentAmount: prev.commentAmount - 1 } : prev)
  }

  const commentComponents = comments.map((c) => {
    return <Comment key={c._id} commentData={c} onVoteComment={voteComment} onDeleteComment={deleteComment} />
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
