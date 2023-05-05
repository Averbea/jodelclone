import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import "./BackHeader.css"
import { useNavigate } from 'react-router-dom'
import HeaderTemplate from '../HeaderTemplate'

export default function BackHeader() {

    const navigate = useNavigate();

    return (
        <HeaderTemplate left={
            <button className="backheader-btn" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        } />
    )
}
