import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../../api'
import { useAuth } from '../Auth'

import Post from '../Post/Post'
import SortingHeader from '../SortingHeader/SortingHeader'

import './Feed.css'

export default function Feed() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts().then((response) => {
      console.log(response)
      if(response){
        setPosts(response.data.posts)
        setLoading(false)
      }
    }).catch((error) => console.log(error))
  },[])

  const postContent = posts.map((post: any) =>   
    <Post key={post._id} postData={post}/>
  )
  
  return (
    <>
      <SortingHeader />
    
      <div className='feed'>
        {postContent}
        {loading && "loading"}
      </div>
    </>
  )
}
