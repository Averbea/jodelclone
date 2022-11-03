import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import "./BackHeader.css"
import { useNavigate } from 'react-router-dom'

export default function BackHeader() {

    const navigate = useNavigate();

    return (
        <div className='backHeader'>
            <button onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
        </div>
    )
}
