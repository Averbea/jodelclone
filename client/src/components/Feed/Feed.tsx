import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPosts } from '../../api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Post from './Post/Post'
import SortingHeader from '../SortingHeader/SortingHeader'

import './Feed.css'
import  Container  from '../Container/Container'
import {PostType} from '../../api'
export default function Feed() {

  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
 
  useEffect(() => {
    fetchPosts().then((response) => {
      console.log(response)
      if(response){
        setPosts(response.data)
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
      <Container>
        {postContent}
        {loading && "loading"}
        <button className="createButton" onClick={() => navigate("/createPost")}> 
            <FontAwesomeIcon icon={faPlus}/> 
        </button>
        
      </Container>
    
      
    </>
  )
}
