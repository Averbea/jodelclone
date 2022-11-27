import React from 'react'
import { Path, To, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';
import Container from '../Container/Container';

import './Login.css'

export default function Login() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  
  const {onLogin} = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //this maybe should be located somewhere else
    try {
      await onLogin(username, password)
      navigate(location.state?.from?.pathname || "/")
    } catch (error) {
      alert("could not sign in. Wrong Credentials?")
      console.log("could not sign in")
    }

  }
  
  return (
    <Container>
      <h1>Welcome to the Jodelclone!</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" autoComplete='username' value={username} onChange={(event) => setUsername(event.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete='password' value={password} onChange={(event) => setPassword(event?.target.value)} />
        <input type="submit" value="Login" />
      </form>

    </Container>
  )
}
