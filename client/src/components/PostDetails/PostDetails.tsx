import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader/BackHeader'
import Container from '../Container/Container'

import { fetchPost, IComment, IPost, votePost } from '../../api'
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

  const vote = async ( postId: String, v: "up" | "down") => {
    const response =  await votePost(postId, v)
    const newPost:IPost = response.data
    setPost(newPost)
  }
  return (
    <>
      <BackHeader />
      <Container>
        {post && <Post postData={post} onVotePost={vote} />}
        <>
          {commentComponents}
        </>
      </Container>
    </>
  )
}
