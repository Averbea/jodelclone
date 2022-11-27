import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './Post.css'

import { IPost} from '../../api';

export default function Post({ postData, usedAsComment = false, onClick= () => {}, onVotePost}: {
  postData: IPost,
  usedAsComment?: boolean, 
  onClick?: Function, 
  onVotePost: (postId: String, vote: "up" | "down") => void
}) {


  const vote = (event: React.MouseEvent, v: "up" | "down") => {
    event.stopPropagation();
    if(onVotePost) onVotePost(postData._id, v)
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
    <div className='post' onClick={() => onClick()}>
      <div className='header'>
        {!usedAsComment && <p className='channel'>@{postData.channel}</p>}
        <p>nah</p>
        <p>•</p>
        <p>5 min</p>
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

