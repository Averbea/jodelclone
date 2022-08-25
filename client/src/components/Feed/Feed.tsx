import React from 'react'

import Post from '../Post/Post'
import SortingHeader from '../SortingHeader/SortingHeader'

import './Feed.css'

export default function Feed() {
  return (
    <>
      <SortingHeader />
    
      <div className='feed'>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </>
  )
}
