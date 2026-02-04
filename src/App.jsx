
import './App.css'
import Navbar from './navbar'
import Carousel from './cariusel'
import Cards from './cards'
import Cartpage from './cartpage'
import BuyNowPage from './buynowpage.jsx'
import Login from '../login/Login.jsx'
import Signup from '../login/Signup.jsx'
import AdminDashboard from './AdminDashboard'
import AddSare from './AddSare'
import { Routes,Route } from 'react-router-dom' 


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element={
        <>
        <Carousel/>
        <Cards/>
        </>
      }/>

      <Route path='/signup' element={
        <>
        <Signup/>
        </>
      }/>

      <Route path='/login' element={
        <>
        <Login/>
        </>
      }/>
    
    <Route path='/cart-page' element={
      <>
      <Cartpage/>
      </>

    }/>

    <Route path='/buy-now-page' element={
      <>
      <BuyNowPage/>
      </>
    }/>

    <Route path='/admin-orders' element={
      <>
      <AdminDashboard/>
      </>
    }/>

    <Route path='/admin-add-saree' element={
      <>
      <AddSare/>
      </>
    }/>
    
    </Routes> 
      
    </>
  )
}

export default App
