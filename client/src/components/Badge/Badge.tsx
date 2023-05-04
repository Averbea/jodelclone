import React, { MouseEventHandler, ReactNode } from 'react'


import './Badge.css'


interface Props {
  active?: boolean,
  children?: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>
}
export default function Badge({ active, children, onClick }: Props) {

  let classes = 'badge '
  if (active) classes += 'badge-active '
  if (onClick) classes += 'badge-clickable '

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
