import {createContext, useContext, useState} from 'react'

import * as api from '../api'


const AuthContext = createContext({
    token: null,
    username: "",
    onLogin: async (username: String, password: String) => {}, 
    onLogout: async () =>  {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
  // TODO: sync with localStorage correctly
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User') || "{}") || null);
  
  const handleLogin = async (username: String, password:String) => {
      const temp = await api.signIn(username, password);
      const user =  {
        token: temp.data.token,
        username: temp.data.username
      }
      localStorage.setItem('User', JSON.stringify(user))
      setUser(user);
  };

  const handleLogout = async () => {
    await api.signOut();
    setUser(null);
    localStorage.removeItem('User')
    window.location.reload()
  };

  const value: any = {
    token: user.token,
    username: user.username,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};