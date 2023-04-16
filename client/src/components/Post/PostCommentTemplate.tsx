import React from 'react'
import { IComment, IPost } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons'



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


function getColor(createdAt: string) {
    // TODO choose more fitting colors 
    const colors = [
        "#9D79BC",
        "#FF751F",
        "#52A362",
        "#2095AC",
        "#D03E2E"
    ]
    const hashVal = createdAt.split('').map(char => char.charCodeAt(0)).reduce((accumulator, value) => accumulator + value)

    return colors[hashVal % colors.length]
}

export default function PostCommentTemplate({ data, type, onClick = () => { }, onVotePost, onDeletePost }: {
    data: IPost | IComment,
    type: "post" | "comment",
    onClick?: Function,
    onVotePost: (postId: string, vote: "up" | "down") => void,
    onDeletePost: (postId: string) => void
}) {

    const usedAsComment = type === "comment"


    const deletePost = (event: React.MouseEvent) => {
        event.stopPropagation();
        onDeletePost(data._id)
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

    let backgroundColor = usedAsComment ? "grey" : getColor(data.createdAt)
    return (
        <div className='post' style={{ backgroundColor: backgroundColor }} onClick={() => onClick()}>
            <div className='header'>
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

        </div>
    )
}
