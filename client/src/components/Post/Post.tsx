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
            <p>/ \</p>
            <p>999</p>
            <p>\ /</p>
          </div>
        </div>

        <div className='comments'>5 Kommentare</div>
        
   </div>
  )
}

