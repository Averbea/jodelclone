import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { View } from '../../App'

import './Footer.css'



export default function Footer( ) {

  function navClasses (currentType: View): string {
    let classes = 'footerMenuItem'
   
    return classes
  }

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
