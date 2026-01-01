
import './carousel.css'
export default function Carousel(){
    return(
        <>

        <div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://veirdo.in/cdn/shop/files/Anger_Green_Oversized_Pocket_Graphic_Printed_Hoodie.jpg?v=1754544896" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://nobero.com/cdn/shop/files/authentic_6275b1bf-598e-49d8-aaaa-3132ea43b2f8.jpg?v=1760172891" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://cottonworld.net/cdn/shop/files/M-SHIRTS-17389-20975-WHITE_1.jpg?v=1752656306" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </>
    )
}