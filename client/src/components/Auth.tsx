import {createContext, useContext, useState} from 'react'

import * as api from '../api'


const AuthContext = createContext({
    token: null, 
    onLogin: async (username: String, password: String) => {}, 
    onLogout: async () =>  {}
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
  // TODO: sync with localStorage correctly
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('User') || "").token || null);
    
  const handleLogin = async (username: String, password:String) => {
      const temp = await api.signIn(username, password);
      const token = temp.data.token 
      localStorage.setItem('User', JSON.stringify({token}))
      setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('User')
  };

  const value: any = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};