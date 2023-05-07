import { useNavigate } from 'react-router-dom';
import * as Api from '../../api'
import CreateTemplate from './CreateTemplate';
import { useState } from 'react';

export default function CreatePost() {
  const navigate = useNavigate()
  const [color, setColor] = useState("")

  const create = async (text: string, channel: string) => {
    try {
      const response = await Api.createPost(text, channel, color)
      const postId = response.data
      console.log(postId)
      navigate(`/posts/${postId}`, { replace: true })
    } catch (error) {

    }
  }

  return (
    <CreateTemplate variant="post" onSubmit={create} color={color} setColor={setColor} placeholder='Schreib einen kreativen Jodel...'/>

  )
}

