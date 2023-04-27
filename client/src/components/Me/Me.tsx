import React from 'react'
import { useAuth } from '../Auth'
import Container from '../Container/Container';

import "./Me.css"
import CustomButton from '../Button/CustomButton';

export default function Me() {
  const { user, onLogout } = useAuth();
  return (
    <Container>
      <h1>Me</h1>
      <div>Username: {user?.username}</div>
      <CustomButton onClick={() => onLogout()} text="Logout" variant='primary' />
    </Container>
  )
}
