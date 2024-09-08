import React from 'react';
import NavBar from './components/NavBar.jsx'
import { Outlet } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className='app-container'>
      <NavBar/> 
      <Outlet/>
    </div>
  )
}

export default App
