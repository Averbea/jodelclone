import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'

import { IPost } from '../../api';


export default function Post({ postData, usedAsComment = false, onClick= () => {}}: {
  postData: IPost,
  usedAsComment?: boolean, 
  onClick?: Function
}) {


  return (
    <div className='post' onClick={() => onClick()}>
      <div className='header'>
        {!usedAsComment && <p className='channel'>@{postData.channel}</p>}
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

      {!usedAsComment && <div className='comments'>{postData.commentAmount} Kommentare</div>}

    </div>
  )
}

