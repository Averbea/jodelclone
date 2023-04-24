import { createContext, useContext, useState } from 'react'
import { Buffer } from 'buffer'

import * as api from '../api'


interface User {
  username: string,
  token: string
}


interface AuthContextType {
  isLoggedIn: () => boolean,
  token: string,
  username: string,
  onLogin: (username: string, password: string) => Promise<void>,
  onLogout: () => Promise<void>,
  onSignUp: (username: string, password: string, repeatPassword: string) => Promise<void>
}


export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType
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
  const [user, setUser] = useState<User | null>(() => {
    let storageUser = localStorage.getItem('User')
    if(!storageUser) return null
    try{
      return JSON.parse(storageUser)
    }catch (error: any){
      return null
    }
  });

 

  async function handleLogin(username: string, password: string) {
    const temp = await api.signIn(username, password);
    console.log(temp)
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
    console.log(user)
    if (user?.token && isExpired(user.token)) {
      console.log("NOOO")
      handleLogout()
      return false
    }
    return true
  }

  const value = {
    isLoggedIn: isLoggedIn,
    token: user?.token || "",
    username: user?.username || "",
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