import React, { ReactNode } from 'react'
import './Header.css'

interface Props{
    children: ReactNode
}


export default function Header({ children }: Props) {
    return (
        <header className="header">
            {children}
        </header>

    )
}
