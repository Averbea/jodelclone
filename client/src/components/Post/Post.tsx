import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'

import { IPost } from '../../api';
import PostCommentTemplate from './PostCommentTemplate';


export default function Post({ postData, usedAsComment = false, onClick = () => { }, onVotePost, onDeletePost }: {
  postData: IPost,
  usedAsComment?: boolean,
  onClick?: Function,
  onVotePost: (postId: String, vote: "up" | "down") => void,
  onDeletePost: (postId: String) => void
}) {

  return (
    <PostCommentTemplate data={postData} type="post" onClick={onClick} onVotePost={onVotePost} onDeletePost={onDeletePost} />
  )
}

