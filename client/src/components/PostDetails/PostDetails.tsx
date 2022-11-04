import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader/BackHeader'
import Container from '../Container/Container'

import { fetchPost, IComment, IPost } from '../../api'
import { useParams } from 'react-router-dom'
import Post from '../Post/Post'
import Comment from '../Post/Comment'


export default function PostDetails() {
  const [post, setPost] = useState<IPost | null>(null)
  const [comments, setComments] = useState<IComment[]>([])

  let { id } = useParams()

  useEffect(() => {
    if (!id) return
    fetchPost(id).then(
      (response) => {
        setPost(response.data)
      }
    )

  }, [id])

  useEffect(() => {
    // TODO fetch comments here ore together with post
  })

  const commentComponents = comments.map((c) => {
    return <Comment commentData={c} />
  })

  return (
    <>
      <BackHeader />
      <Container>
        {post && <Post postData={post} />}
        <>
          {commentComponents}
        </>
      </Container>
    </>
  )
}
