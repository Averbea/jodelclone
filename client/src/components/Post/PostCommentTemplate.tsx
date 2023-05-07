import React, { useState } from 'react'
import { IComment, IPost } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'



function getTimeToDisplay(prevDate: string): string {


    const diff = Date.now() - new Date(prevDate).getTime()

    const diffInMins = Math.floor(diff / 60000)
    const diffInHours = Math.floor(diffInMins / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)

    if (diffInWeeks > 0) {
        return `vor ${diffInWeeks} ${diffInWeeks === 1 ? "Woche" : "Wochen"}`
    }
    if (diffInDays > 0) {
        return `vor ${diffInDays} ${diffInDays === 1 ? "Tag" : "Tagen"}`
    }
    if (diffInHours > 0) {
        return `vor ${diffInHours} ${diffInHours === 1 ? "Stunde" : "Stunden"}`
    }
    return `vor ${diffInMins} ${diffInMins === 1 ? "Minute" : "Minuten"}`
}


export default function PostCommentTemplate({ data, type, onClick, onVotePost, onDeletePost }: {
    data: IPost | IComment,
    type: "post" | "comment",
    onClick?: Function,
    onVotePost: (postId: string, vote: "up" | "down") => void,
    onDeletePost: (postId: string) => void
}) {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const usedAsComment = type === "comment"


    const deletePost = (event: React.MouseEvent) => {
        event.stopPropagation();
        setShowDeleteDialog(true)
    }
    const vote = (event: React.MouseEvent, v: "up" | "down") => {
        event.stopPropagation();
        if (onVotePost) onVotePost(data._id, v)
    }


    let classesUp = "vote-button"
    let classesDown = "vote-button"

    if (data.userVote === "up") {
        classesUp += " voted"
        classesDown += " not-voted"
    }
    else if (data.userVote === "down") {
        classesDown += " voted"
        classesUp += " not-voted"
    }


    let style: React.CSSProperties = {
        backgroundColor: "color" in data ? data.color : "grey"
    }

    if (onClick) {
        style.cursor = "pointer"
    }

    return (
        <div className='post' style={style} onClick={() => onClick ? onClick() : {}}>
            <div className='postheader'>
                {!usedAsComment && "channel" in data && <p className='channel'>@{data.channel}</p>}
                <p>nah</p>
                <p>•</p>
                <p>{getTimeToDisplay(data.createdAt)}</p>
                {data.isUsersPost &&
                    <div className="delete" onClick={(event) => deletePost(event)}>
                        <FontAwesomeIcon size="1x" icon={faTrash} />
                    </div>}
            </div>

            <div className='middle-block'>
                <div className='content'> {data.message}</div>
                <div className='voting'>
                    <button disabled={data.userVote !== "none" ? true : false} onClick={(event) => vote(event, "up",)} className={classesUp} >
                        <FontAwesomeIcon size='2x' icon={faChevronUp} />
                    </button>
                    <p>{data.votes}</p>
                    <button disabled={data.userVote !== "none" ? true : false} onClick={(event) => vote(event, "down")} className={classesDown}>
                        <FontAwesomeIcon size='2x' icon={faChevronDown} />
                    </button>
                </div>
            </div>

            {!usedAsComment && "commentAmount" in data && <div className='comments'>{data.commentAmount} Kommentare</div>}


            {showDeleteDialog && <ConfirmDialog onCancel={() => setShowDeleteDialog(false)} onConfirm={() => onDeletePost(data._id)}>
                Do you really want to delete this {type.charAt(0).toUpperCase() + type.slice(1)}?
            </ConfirmDialog>}

        </div>
    )
}
