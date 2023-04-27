import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import "./BackHeader.css"
import { useNavigate } from 'react-router-dom'
import Header from '../Header'

export default function BackHeader() {

    const navigate = useNavigate();

    return (
        <Header>
            <button className="backheader-btn" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        </Header>
    )
}
