import React from 'react'

import './SortingHeader.css'

export default function SortingHeader() {
  return (
      <div className='navbar'>
  
            <p className='headerMenuItem activeSortingItem'>Neueste</p>
            <p className='headerMenuItem'>Meist kommentierte</p>
            <p className='headerMenuItem'>Lauteste</p>

      </div>
  
  )
}
