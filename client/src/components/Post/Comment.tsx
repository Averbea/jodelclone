import React from 'react'
import { IComment, IPost, votePost } from '../../api'
import Post from './Post'

interface Props {
    commentData: IComment  
}



export default function Comment({ commentData }: Props) {
    const tmp: IPost = {
        ...commentData,
        commentAmount: 0,
        channel: "", 
        createdAt: "December 24, 2022 23:59:59"
    }

    const vote = async ( postId: String, v: "up" | "down") => {
        // const response =  await votePost(postId, v)
        // const newPost:IPost = response.data
        //TODO Voting for comments
    
      }
    return (
        <Post onVotePost={vote} postData={tmp} usedAsComment={true} />
    )
}
