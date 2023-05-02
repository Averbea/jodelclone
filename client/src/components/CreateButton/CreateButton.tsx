import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import './CreateButton.css'

interface Props{
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function CreateButton({ onClick } : Props) {
  return (
    <button className="createButton" onClick={onClick}>
      <FontAwesomeIcon className="createButtonIcon" icon={faPlus} />
    </button>
  )
}
