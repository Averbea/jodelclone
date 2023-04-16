import { createContext, useContext, useState } from 'react'
import { Buffer } from 'buffer'

import * as api from '../api'
const AuthContext = createContext({
  isLoggedIn: () => false,
  username: "",
  onLogin: async (username: string, password: string) => { },
  onLogout: async () => { },
  onSignUp: async (username: string, password: string, repeatPassword: string) => { }
})

export const useAuth = () => {
  return useContext(AuthContext)
}


const parseJwt = (token: string) => {
  try {
    let tmp = token.split('.')[1]
    return JSON.parse(Buffer.from(tmp, 'base64').toString());
  } catch (e) {
    return null;
  }
};

function isExpired(token: string) {
  const decodedJwt = parseJwt(token);
  if (decodedJwt?.exp * 1000 < Date.now()) {
    return true
  }
  return false
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // TODO: sync with localStorage correctly
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User') || "{}") || null);

  async function handleLogin(username: string, password: string) {
    const temp = await api.signIn(username, password);
    const user = {
      token: temp.data.token,
      username: temp.data.username
    }
    localStorage.setItem('User', JSON.stringify(user))
    setUser(user);
  };

  async function handleLogout() {
    localStorage.removeItem('User')
    setUser(null);
    await api.signOut();
  };

  async function handleSignUp(username: string, password: string, repeatPassword: string) {
    const res = await api.signUp(username, password, repeatPassword)
    if (res.status !== 200) {
      let tmp: any = res
      throw new Error(tmp.response.data.message)
    }
    const user = {
      token: res.data.token,
      username: res.data.username
    }
    localStorage.setItem('User', JSON.stringify(user))
    setUser(res.data)
  }

  function isLoggedIn() {
    // this checks if the user is expired on every usage of the token and syncs to localstorage
    if (!user) return false
    if (user?.token && isExpired(user.token)) {
      handleLogout()
      return false
    }
    return true
  }

  const value: any = {
    isLoggedIn: isLoggedIn,
    token: user?.token,
    username: user?.username,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSignUp: handleSignUp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};