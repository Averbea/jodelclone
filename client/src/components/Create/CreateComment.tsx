import { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Api from '../../api'

import CreateTemplate from './CreateTemplate';

export default function CreateComment() {
  const navigate = useNavigate()



  let { id } = useParams()

  let postId = id ? id : ""

  //TODO should the input be synced to a state or is this the better way?
  const create = async (e: FormEvent, text: string) => {
    e.preventDefault()
    try {
      await Api.commentPost(postId, text)
      navigate(-1)
    } catch (error) {

    }
  }
  return (
      <CreateTemplate onSubmit={create} placeholder='Kommentieren...' />
  )
}

