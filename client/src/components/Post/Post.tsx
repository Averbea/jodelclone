import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'

import { IPost} from '../../api';




function getTimeToDisplay(prevDate: string):string{

  
  const diff = Date.now() - new Date(prevDate).getTime()

  const diffInMins = Math.floor(diff / 60000)
  const diffInHours = Math.floor(diffInMins / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInWeeks = Math.floor(diffInDays / 7)
  
  if (diffInWeeks > 0){
    return `vor ${diffInWeeks} ${diffInWeeks === 1? "Woche": "Wochen"}`
  }
  if( diffInDays > 0){
    return `vor ${diffInDays} ${diffInDays === 1?"Tag":"Tagen"}`
  }
  if (diffInHours > 0){
    return `vor ${diffInHours} ${diffInHours === 1?"Stunde":"Stunden"}`
  }
  return `vor ${diffInMins} ${diffInMins === 1 ?"Minute":"Minuten"}`
}


function getColor(createdAt: string){
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

export default function Post({ postData, usedAsComment = false, onClick= () => {}, onVotePost, onDeletePost}: {
  postData: IPost,
  usedAsComment?: boolean, 
  onClick?: Function, 
  onVotePost: (postId: String, vote: "up" | "down") => void, 
  onDeletePost: (postId: String) => void
}) {

  const vote = (event: React.MouseEvent, v: "up" | "down") => {
    event.stopPropagation();
    if(onVotePost) onVotePost(postData._id, v)
  }

  const deletePost = (event: React.MouseEvent) => {
      event.stopPropagation();
      onDeletePost(postData._id)
  }
  let classesUp = "vote-button"
  let classesDown = "vote-button"

  if(postData.userVote === "up"){
    classesUp += " voted"
    classesDown +=" not-voted"
  }
  else if(postData.userVote === "down"){
    classesDown += " voted"
    classesUp +=" not-voted"
  }

  return (
    <div className='post' style={{backgroundColor: getColor(postData.createdAt)}} onClick={() => onClick()}>
      <div className='header'>
        {!usedAsComment && <p className='channel'>@{postData.channel}</p>}
        <p>nah</p>
        <p>•</p>
        <p>{getTimeToDisplay(postData.createdAt)}</p>
        {postData.isUsersPost && 
        <div className="delete" onClick={(event) => deletePost(event)}>
          <FontAwesomeIcon size="1x" icon={faTrash} />
        </div>}
      </div>

      <div className='middle-block'>
        <div className='content'> {postData.message}</div>
        <div className='voting'>
          <button disabled={postData.userVote !== "none"? true: false} onClick={(event) => vote(event, "up",)} className={classesUp} >
            <FontAwesomeIcon size='2x' icon={faChevronUp} />
          </button>
          <p>{postData.votes}</p>
          <button disabled={postData.userVote !== "none"? true: false} onClick={(event) => vote(event, "down")} className={classesDown}>
            <FontAwesomeIcon size='2x' icon={faChevronDown} />
          </button>
        </div>
      </div>

      {!usedAsComment && <div className='comments'>{postData.commentAmount} Kommentare</div>}

    </div>
  )
}

