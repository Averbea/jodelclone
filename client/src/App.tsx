import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import { AuthProvider, useAuth } from './components/Auth';
import CreatePost from './components/CreatePost/CreatePost';
import PostDetails from './components/PostDetails/PostDetails';
import Me from './components/Me/Me';
import CreateComment from './components/CreateComment/CreateComment';

function App() {

  return (
    <div className='App'> 
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<><Outlet /><Footer/></>}> 
              <Route element={<PrivateRoutes/>}>
                <Route path="/" element={<Feed />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/posts/:id/comment" element={<CreateComment />} />
                <Route path="/createPost" element={<CreatePost/>}/>
                <Route path="/Me" element={<Me/>}/>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route path="login" element={<LoginWrapper />} />
          </Routes>

        </BrowserRouter>
      </AuthProvider>     
    </div>
  );
}

export default App;

const LoginWrapper = () => {
  const { isLoggedIn } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) {}
      navigate("/")
    }, [isLoggedIn, navigate])

  return <Login />
}


const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

    return (
      isLoggedIn() ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace />
    ) 
}