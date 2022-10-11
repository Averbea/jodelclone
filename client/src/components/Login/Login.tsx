import React from 'react'
import * as api from '../../api';

import './Login.css'

export default function Login() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //this maybe should be located somewhere else
    api.signIn(username, password)
  


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
