import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader/BackHeader'
import Container from '../Container/Container'

import { deletePost, fetchPost, getCommentsForPost, IComment, IPost, votePost } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../Post/Post'
import Comment from '../Post/Comment'


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
    return <Comment commentData={c} />
  })

  const vote = async (postId: String, v: "up" | "down") => {
    const response = await votePost(postId, v)
    const newPost: IPost = response.data
    setPost(newPost)
  }

  const onDeletePost = async (postId: String) => {
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
      </Container>
    </>
  )
}
