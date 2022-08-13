import React from 'react'
import { View } from '../../App'

import './Footer.css'


type FooterProps = {
  changeView: Function, 
  activePage: View
}

export default function Footer( { changeView, activePage }: FooterProps ) {

  function navClasses (currentType: View): string {
    let classes = 'footerMenuItem'
    if (activePage === currentType){
      classes += ' activePage'
    }
    return classes
  }

  return (
    <div className='footer'>
        <p className={navClasses(View.Home)} onClick={() => changeView(View.Home)}>Home</p>
        <p className={navClasses(View.Channels)} onClick={() => changeView(View.Channels)}>Channels</p>
        <p className={navClasses(View.Inbox)} onClick={() => changeView(View.Inbox)}>Inbox</p>
        <p className={navClasses(View.Me)} onClick={() => changeView(View.Me)}>Me</p>
    </div>
  )
}
