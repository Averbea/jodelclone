import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth} from '../Auth';
import Container from '../Container/Container';

import './Login.css'

export default function Login() {

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [repeatPassword, setRepeatPassword] = React.useState("")

  const [isSignUp, setIsSignUp] = React.useState(false)

  const [errorText, setErrorText] = React.useState("")

  const { onLogin, onSignUp, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    //this maybe should be located somewhere else
    isSignUp ? signUpPressed() : signInPressed()

  }
  async function signUpPressed() {
    if(username === "" || password === ""){
      setErrorText("No Username or Password given")
      return
    }
    if(password !== repeatPassword){
      setErrorText("Passwords don't match")
      return
    }

    try {
      await onSignUp(username, password, repeatPassword)
      navigate("/")
    } catch (error: any) {
      setErrorText(error.message)
    }
  }


  async function signInPressed() {
    try {
      await onLogin(username, password)
      navigate(location.state?.from?.pathname || "/")
    } catch (error) {
      setErrorText("Could not sign in. Wrong Credentials?")
    }

  }

  function switchMode(){
    setIsSignUp(prev => !prev)
    setErrorText("")
    setUsername("")
    setPassword("")
    setRepeatPassword("")
  }

  if (isLoggedIn()) return <Navigate to="/" />

  const titleText = isSignUp ? "Sign up for Jodelclone" : "Welcome to Jodelclone"
  const submitText = isSignUp ? "Sign Up" : "Log In"
  const changeModeText = isSignUp ? "Log In" : "Sign Up"

  return (
    <Container >
      <div className="login">
        <h1 className='title'>{titleText}</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" autoComplete='username' value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" autoComplete='password' value={password} onChange={(event) => setPassword(event?.target.value)} />
          </div>
          {isSignUp && <div className="input-container">
            <label htmlFor="password">Repeat Password:</label>
            <input id="password" type="password" autoComplete='password' value={repeatPassword} onChange={(event) => setRepeatPassword(event?.target.value)} />
          </div>
          }
          <div className="button-container">
            <input id="submit" type="submit" value={submitText} />
          </div>

        </form>
        <div className="button-container">
          <input id="changeMode" type="button" value={changeModeText} onClick={switchMode} />
        </div>
        {errorText && <div className="error">
          {errorText}
        </div>}
      </div>

    </Container>
  )
}
