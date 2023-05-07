import React, { CSSProperties, ReactNode } from 'react'

interface Props {
    left?: ReactNode,
    center?: ReactNode,
    right?: ReactNode
}


export default function HeaderTemplate({ left, center, right }: Props) {


    const headerStyle: CSSProperties = {
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0, 0, 0, .2)",
        padding: ".5rem",
        height: "4rem",
        position: "sticky",
        top: 0,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        width: "100%"

    }


    return (
        <header style={headerStyle}>
            <div style={{ justifySelf: "left", display: "flex", alignItems: "center" }}>{left}</div>
            <div style={{ display: "flex", alignItems: "center" }}>{center}</div>
            <div style={{ justifySelf: "right", display: "flex", alignItems: "center" }}>{right}</div>
        </header>

    )
}
