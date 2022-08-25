import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'

export default function Post() {
  return (
   <div className='post'>
        <div className='header'>
          <p className='channel'>@main</p>
          <p>nah</p>
          <p>•</p>
          <p>5 min</p>
        </div>

        <div className='middle-block'>
          <div className='content'> Lorem Ipsum dolor sit ametLorem Ipsum dolor sit ametLorem Ipsum dolor sit amet</div>
          <div className='voting'>
            <FontAwesomeIcon size='2x' icon={faChevronUp} />
            <p>999</p>
            <FontAwesomeIcon size='2x' icon={faChevronDown} />
          </div>
        </div>

        <div className='comments'>5 Kommentare</div>
        
   </div>
  )
}

