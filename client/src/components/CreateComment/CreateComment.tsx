import React, { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api'
import BackHeader from '../BackHeader/BackHeader';
import Container from '../Container/Container';

import './CreateComment.css'

export default function CreateComment() {
  const navigate = useNavigate()

  const [text, setText] = useState("");

  let { id } = useParams()

  let postId = id ? id : ""

  //TODO should the input be synced to a state or is this the better way?
  const create = async (e: FormEvent) => {
    e.preventDefault()

    try {

      const response = await Api.commentPost(postId, text)
      navigate(`/posts/${postId}`, { replace: true })
    } catch (error) {

    }
  }

  return (
    <>
      <BackHeader />
      <Container>
        <form className='createForm' onSubmit={create}>
          <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder='Gib deinen Jodel ein....' />
          <button type="submit" >Send</button>
        </form>
      </Container>
    </>

  )
}

