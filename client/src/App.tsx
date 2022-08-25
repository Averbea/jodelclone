import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';

export enum View { Home, Channels, Inbox, Me, Post}
function App() {

  
  return (
    <div className='App'>
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} ></Route>
          <Route path="*" element={<NotFound />} ></Route>
         
        </Routes>
        <Footer /> 
      </BrowserRouter>
    </div>
  );
}

export default App;
