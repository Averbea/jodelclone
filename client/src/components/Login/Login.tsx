import React from 'react'
import { Path, To, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth';

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
    <div>
      <h1>Welcome to the Jodelclone!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" autoComplete='username' value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" autoComplete='password' value={password} onChange={(event) => setPassword(event?.target.value)} />
        </label>
        <input type="submit" value="Login" />
      </form>

    </div>
  )
}
