import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPosts, votePost } from '../../api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Post from '../Post/Post'
import SortingHeader from '../SortingHeader/SortingHeader'

import './Feed.css'
import  Container  from '../Container/Container'
import {IPost} from '../../api'
export default function Feed() {

  const [posts, setPosts] = useState<IPost[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
 
  console.log(posts)
  useEffect(() => {
    fetchPosts().then((response) => {
      console.log(response)
      if(response){
        setPosts(response.data)
        setLoading(false)
      }
    }).catch((error) => console.log(error))
  },[])
  
  
  const vote = async ( postId: String, v: "up" | "down") => {
    const response =  await votePost(postId, v)
    const newPost:IPost = response.data
    setPosts((old) => old.map(prev => {
      if(prev._id === newPost._id){
        return newPost
      }else{
        return prev
      }
    }))

  }
  
  const postContent = posts.map((post: any) => 
    <Post key={post._id} postData={post} onVotePost={vote} onClick={() => navigate(`/posts/${post._id}`)}/> 
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
