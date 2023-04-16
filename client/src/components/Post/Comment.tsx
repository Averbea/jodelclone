import React from 'react'
import { IComment } from '../../api'
import PostCommentTemplate from './PostCommentTemplate'

interface Props {
    commentData: IComment
}

export default function Comment({ commentData }: Props) {
    const onVoteComment = async (postId: string, v: "up" | "down") => {
        // const response =  await votePost(postId, v)
        // const newPost:IPost = response.data
        //TODO Voting for comments
    }

    const onDeleteComment = async (postId: string) => {
        //TODO delete comment
    }
    return (
        <PostCommentTemplate data={commentData} type="comment" onVotePost={onVoteComment} onDeletePost={onDeleteComment} />

    )
}
