import React from 'react'
import { IComment } from '../../api'
import PostCommentTemplate from './PostCommentTemplate'

interface Props {
    commentData: IComment,
    onVoteComment: (commentId: string, vote: "up" | "down") => void,
    onDeleteComment: (commentId: string) => void
}

export default function Comment({ commentData, onVoteComment, onDeleteComment }: Props) {
    return (
        <PostCommentTemplate data={commentData} type="comment" onVotePost={onVoteComment} onDeletePost={onDeleteComment} />
    )
}
