import { useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api'
import CreateTemplate from './CreateTemplate';

export default function CreateComment() {
  const navigate = useNavigate()

  let { id } = useParams()

  let postId = id ? id : ""

  const create = async (text: string) => {
    try {
      await Api.commentPost(postId, text)
      navigate(-1)
    } catch (error) {

    }
  }
  return (
      <CreateTemplate variant="comment" onSubmit={create} placeholder='Kommentieren...' />
  )
}

