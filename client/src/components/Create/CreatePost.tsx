import { useNavigate } from 'react-router-dom';
import * as Api from '../../api'
import CreateTemplate from './CreateTemplate';

export default function CreatePost() {
  const navigate = useNavigate()

  const create = async (text: string, channel: string) => {
    try {
      const response = await Api.createPost(text, channel)
      const postId = response.data
      console.log(postId)
      navigate(`/posts/${postId}`, { replace: true })
    } catch (error) {

    }
  }

  return (
    <CreateTemplate variant="post" onSubmit={create} placeholder='Schreib einen kreativen Jodel...'/>

  )
}

