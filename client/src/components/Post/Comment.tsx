import React from 'react'
import { IComment, IPost, votePost } from '../../api'
import Post from './Post'
import PostCommentTemplate from './PostCommentTemplate'

interface Props {
    commentData: IComment
}



export default function Comment({ commentData }: Props) {


    const onVoteComment = async (postId: String, v: "up" | "down") => {
        // const response =  await votePost(postId, v)
        // const newPost:IPost = response.data
        //TODO Voting for comments
    }

    const onDeleteComment = async (postId: String) => {
        //TODO delete comment
    }
    return (
        <PostCommentTemplate data={commentData} type="comment" onVotePost={onVoteComment} onDeletePost={onDeleteComment} />

    )
}
