

import './navbar.css'
export default function Navbar(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid nav-container">
        <a className="navbar-brand" href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ThQ7jFF-duSn2D5VSklt5eXk3WW_ZgiRZQ&s"
            alt="Logo"
            width="100%"
            height="40"
            className="d-inline-block align-text-top"
          />
        </a>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item">
              <p className="nav-link" href="#">mahanth</p>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
           
            

             <li className="nav-item">
              <p className="nav-link profile" >
                Cart
              </p>
            </li>

           
            <li className="nav-item">
              <p className="nav-link signout" >Orders</p>
            </li>
            
          </ul>
        </div>
      </div>
    </nav></>
    )
}