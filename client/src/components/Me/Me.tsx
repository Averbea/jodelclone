import React from 'react'
import { useAuth } from '../Auth'
import Container from '../Container/Container';

import "./Me.css"

export default function Me() {
  const { user, onLogout } = useAuth();
  return (
    <Container>
      <h1>Me</h1>
      <div>{user?.username}</div>
      <button id="logout-button" onClick={() => onLogout()}>Logout</button>
    </Container>
  )
}
