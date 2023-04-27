import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api/'
import BackHeader from '../Header/BackHeader/BackHeader';
import Container from '../Container/Container';

import './CreatePost.css'

export default function CreatePost() {
  const navigate = useNavigate()

  const [text, setText] = useState("");


  //TODO should the input be synced to a state or is this the better way?
  const create = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await Api.createPost(text)
      const postId = response.data
      navigate(`/posts/${postId}`, { replace: true })
    } catch (error) {

    }
  }

  return (
    <>
      <BackHeader />
      <Container>
        <form className='createForm' onSubmit={create}>
          <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder='Schreib einen kreativen Jodel...' />
          <button type="submit" >Send</button>
        </form>
      </Container>
    </>

  )
}

