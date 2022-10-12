import React from 'react'
import * as api from '../../api';

import './Login.css'

export default function Login() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //this maybe should be located somewhere else
    try {
      api.signIn(username, password)
      // .then((response) => console.log(response) )
      .then((response:any) => localStorage.setItem('User', JSON.stringify(response.data)));
    } catch (error) {
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
