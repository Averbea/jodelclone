import React from 'react'

import './Navbar.css'

export default function Navbar() {
  return (
      <div className='navbar'>
       
          <h2>Jodelclone</h2>
          <div>
            <p className='headerMenuItem'>Neueste</p>
            <p className='headerMenuItem'>Meist kommentierte</p>
            <p className='headerMenuItem'>Lauteste</p>
          </div>

        
      </div>
  
  )
}
