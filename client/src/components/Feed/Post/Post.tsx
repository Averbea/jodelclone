import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'
import { useNavigate } from 'react-router-dom';


export default function Post({ postData }:{
  postData:  {
    _id: String,
    isUsersPost: boolean, 
    message: string, 
    votes: number, 
    commentAmount: number, 
    channel: String
  }
}) {
  const navigate = useNavigate()
  
  return (
   <div className='post' onClick={() => navigate(`/posts/${postData._id}`)}>
        <div className='header'>
          <p className='channel'>@{postData.channel}</p>
          <p>nah</p>
          <p>•</p>
          <p>5 min</p>
        </div>

        <div className='middle-block'>
          <div className='content'> {postData.message}</div>
          <div className='voting'>
            <FontAwesomeIcon size='2x' icon={faChevronUp} />
            <p>{postData.votes}</p>
            <FontAwesomeIcon size='2x' icon={faChevronDown} />
          </div>
        </div>

        <div className='comments'>{postData.commentAmount} Kommentare</div>
        
   </div>
  )
}

