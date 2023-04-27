import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api'


import CreateTemplate from './CreateTemplate';

export default function CreatePost() {
  const navigate = useNavigate()

  //TODO should the input be synced to a state or is this the better way?
  const create = async (e: FormEvent, text: string) => {
    e.preventDefault()

    try {
      const response = await Api.createPost(text)
      const postId = response.data
      console.log(postId)
      navigate(`/posts/${postId}`, { replace: true })
    } catch (error) {

    }
  }

  return (
    <CreateTemplate onSubmit={create} placeholder='Schreib einen kreativen Jodel...'/>

  )
}

