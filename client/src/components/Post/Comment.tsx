import React from 'react'
import { IComment, IPost } from '../../api'
import Post from './Post'

interface Props {
    commentData: IComment  
}



export default function Comment({ commentData }: Props) {
    const tmp: IPost = {
        ...commentData,
        commentAmount: 0,
        channel: ""
    }

    return (
        <Post postData={tmp} usedAsComment={true} />
    )
}
