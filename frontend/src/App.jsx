import React from 'react'
import Register from './Register'
import Login from './Login'
import './App.css'
import Profile from './Profile'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App