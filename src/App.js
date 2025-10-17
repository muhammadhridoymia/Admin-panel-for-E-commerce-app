import React from 'react'
import Home from './Pages/Home'
import Catagory from './Pages/Catagory';
import { Routes, Route } from 'react-router-dom';
import UploadProduct from './Pages/UploadProduct'
import AdminOrdersPage from './Components/Orders';
import Allusers from './Components/allusers';
import AdBanner from './Components/Bannershow';
import AllProducts from './Components/fetchProduct';

function App() {
  return (
    <Routes>
      <Route path='/uploadproduct' element={<UploadProduct/>}/>
      <Route path='/orders' element={<AdminOrdersPage />} />
      <Route path='/' element={<Home/>}/>
      <Route path='/category' element={<Catagory/>}/>
      <Route path='/allusers' element={<Allusers/>}/>
      <Route path='/advertisements' element={<AdBanner/>}/>
      <Route path='/allproducts' element={<AllProducts/>}/>
    </Routes>
  )
}

export default App