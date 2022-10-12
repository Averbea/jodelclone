import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'


export default function Post(props: { postData: any; }) {
  const postData = props.postData

  return (
   <div className='post'>
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
            <p>{postData.upvotes.length - postData.downvotes.length}</p>
            <FontAwesomeIcon size='2x' icon={faChevronDown} />
          </div>
        </div>

        <div className='comments'>5 Kommentare</div>
        
   </div>
  )
}

