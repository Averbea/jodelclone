import React from 'react'
import { NavLink } from 'react-router-dom'

import './Footer.css'



export default function Footer( ) {
  return (
    <div className='footer'>
      <NavLink className="footerMenuItem" to="/">
        Home
      </NavLink>
      <NavLink className="footerMenuItem" to="Channels">
        Channels
      </NavLink>
      <NavLink className="footerMenuItem" to="Inbox">
        Inbox
      </NavLink>
      <NavLink className="footerMenuItem" to="Me">
        Me
      </NavLink>
    </div>
  )
}
