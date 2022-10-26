import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import { AuthProvider, useAuth } from './components/Auth';

function App() {

  return (
    <div className='App'> 
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
            <Route path="login" element={<Login />}/>        
          </Routes>
          <Footer /> 
        </BrowserRouter>
      </AuthProvider>     
    </div>
  );
}

export default App;

type propTypes = {
  children: any
}
const ProtectedRoute = ({ children } : propTypes) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return children;
};