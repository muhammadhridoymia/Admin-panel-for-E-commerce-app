import React from 'react'
import Home from './Pages/Home'
import Catagory from './Pages/Catagory';
import { Routes, Route } from 'react-router-dom';
import UploadProduct from './Pages/UploadProduct'

function App() {
  return (
    <Routes>
      <Route path='/uploadproduct' element={<UploadProduct/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/category' element={<Catagory/>}/>
    </Routes>
  )
}

export default App