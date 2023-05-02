import React, { useEffect, useState } from 'react'
import BackHeader from '../Header/BackHeader/BackHeader'
import Container from '../Container/Container'

import { apiDeleteComment, apiVoteComment, deletePost, fetchPost, getCommentsForPost, IComment, IPost, votePost } from '../../api'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../Post/Post'
import Comment from '../Post/Comment'
import CreateButton from '../CreateButton/CreateButton'

import { useFetchAndUpdateArrOnScroll } from '../../hooks/useFetchAndUpdateArrOnScroll'


export default function PostDetails() {
  const [post, setPost] = useState<IPost | null>(null)
  const [comments, setComments] = useState<IComment[]>([])

  let { id } = useParams()

  let navigate = useNavigate()

  function updateComments(){
    if(!id) return
    getCommentsForPost(id, comments.length)
    .then((res) => setComments(prev => prev.concat(res.data.comments)))
  }

  const {lastRef} = useFetchAndUpdateArrOnScroll(comments, updateComments)
  
  useEffect(() =>{
    if(!id) return
    fetchPost(id)
    .then((response) => {
      if (response.data) {
        setPost(response.data)
      } else {
        navigate("/notfound", { replace: true })
      }
    })
  },[id, navigate])


  async function voteComment(commentId: string, vote: "up" | "down") {
    if (!post) return
    let response = await apiVoteComment(post._id, commentId, vote)
    let newComment = response.data
    setComments(prev => prev.map((c => c._id === newComment._id ? newComment : c)))
  }

  async function deleteComment(commentId: string) {
    if (!post) return
    let confirm = window.confirm("Do you really want to delete this comment?")
    if (!confirm) return
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

        <CreateButton onClick={() => navigate("./comment")} />
        <div ref={lastRef}/>
      </Container>
    </>
  )
}
