import React from 'react'
import Home from './Pages/Home'
import Catagory from './Pages/Catagory';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/category' element={<Catagory/>}/>
    </Routes>
  )
}

export default App