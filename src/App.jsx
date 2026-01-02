
import './App.css'
import Navbar from './navbar'
import Carousel from './cariusel'
import Cards from './cards'
import Cartpage from './cartpage'
import BuyNowPage from './buynowpage.jsx'
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
    
    </Routes>
      
    </>
  )
}

export default App
