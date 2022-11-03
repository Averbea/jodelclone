import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api/'
import BackHeader from '../BackHeader/BackHeader';

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
      navigate(`/${postId}`)
    } catch (error) {
             
    }    
  }

  return (
    <div className='createPost'>
      <BackHeader/>
      <form className='createForm' onSubmit={create}>
        <textarea required value={text} onChange={(e) => setText(e.target.value)} placeholder='Gib deinen Jodel ein....' />
        <button type="submit" >Send</button>
      </form>
    </div>

  )
}
