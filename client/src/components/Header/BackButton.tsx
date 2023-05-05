import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {

    const navigate = useNavigate()




    const BackButtonStyle: CSSProperties = {
        backgroundColor: "transparent",
        border: "none",
        fontSize: "large",
        marginLeft: ".5rem",
        height: "100%",
        cursor: "pointer",
        width: "40px",
    }

    return (
        <button style={BackButtonStyle} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    )
}
