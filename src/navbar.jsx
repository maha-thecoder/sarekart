

import './navbar.css'
import { useNavigate } from 'react-router-dom'
export default function Navbar(){
  const history=useNavigate()
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand" onClick={()=>history('/main-site')}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ThQ7jFF-duSn2D5VSklt5eXk3WW_ZgiRZQ&s" alt="logo" />
          </div>

          <div className="search-wrap">
            <input className="search-input" placeholder="Search for sarees, brands and more" />
          </div>

          <div className="top-actions">
            <button className="icon-btn" onClick={()=>history('/orders')}>Orders</button>
            <button className="icon-btn" onClick={()=>history('/cart-page')}>Cart</button>
            <button className="profile-btn" onClick={()=>history('/signup')}>sign out</button>
          </div>
        </div>
      </header>

      {/* Bottom navigation - mobile friendly */}
      <nav className="bottom-nav">
        <button className="bottom-item" onClick={()=>history('/')}>🏠<span>Home</span></button>
        <button className="bottom-item" onClick={()=>history('/cart-page')}>🛒<span>Cart</span></button>
        <button className="bottom-item" onClick={()=>history('/orders')}>📦<span>Orders</span></button>
        <button className="bottom-item" onClick={()=>history('/signup')}>👤<span>Sign out</span></button>
      </nav>
    </>
  )
}