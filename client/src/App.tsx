import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './components/Feed/Feed';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <>
      <Navbar />
      <Feed/>
      <Footer/>
    </>
  );
}

export default App;
