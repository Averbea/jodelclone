import {createContext, useContext, useEffect, useState} from 'react'


import * as api from '../api'


const AuthContext = createContext({
    token: null,
    username: "",
    onLogin: async (username: String, password: String) => {}, 
    onLogout: async () =>  {},
    onSignUp: async (username: String, password: String, repeatPassword: String) => {}
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

function isExpired (token: string) {
  const decodedJwt = parseJwt(token);
  if (decodedJwt?.exp * 1000 < Date.now()) {
    return true
  }
  return false
}

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
  // TODO: sync with localStorage correctly
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User') || "{}") || null);
  
  useEffect(() => {
    if(user?.token && isExpired(user.token)){
      handleLogout()
    }
  }, [user])

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

  const handleSignUp = async (username: String, password:String, repeatPassword: String) => {
    const res = await api.signUp(username, password, repeatPassword )
    if(res.status !== 200){
      let tmp: any = res
      throw new Error(tmp.response.data.message)
    }
    const user =  {
      token: res.data.token,
      username: res.data.username
    }
    localStorage.setItem('User', JSON.stringify(user))
    setUser(res.data)
  }

  const value: any = {
    token: user.token,
    username: user.username,
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