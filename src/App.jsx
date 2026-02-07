
import './App.css'
import Navbar from './navbar'
import Carousel from './cariusel'
import Cards from './cards'
import Cartpage from './cartpage'
import BuyNowPage from './buynowpage.jsx'
import Login from './login/Login.jsx'
import Signup from './login/Signup.jsx'
import AdminDashboard from './AdminDashboard'
import AddSare from './AddSare'
import OrderPage from './OrderPage.jsx'
import AuthRoute from './authroute.jsx'
import { Routes,Route, useLocation } from 'react-router-dom' 


function App() {
  return (
    <>
    {/* Hide navbar on login and signup pages */}
    <NavbarWrapper />
    <Routes>

      <Route path='/' element={
        <AuthRoute>
        <>
        
        <Carousel/>
        <Cards/>
        
        
        </>
         </AuthRoute>
        
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

    <Route path='/orders' element={
      <>
      <OrderPage/>
      </>
    }/>
    
    </Routes> 
      
    </>
  )
}

export default App

function NavbarWrapper(){
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];
  if(hideNavbarPaths.includes(location.pathname)) return null;
  return <Navbar />;
}
