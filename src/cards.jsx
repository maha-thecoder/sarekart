import { useEffect, useState } from "react";
import { addingitems } from "./utilities/cart";
import axios from 'axios';
import './card.css'

export default function Cards() {

  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : 'https://sare-kart-backend.onrender.com';
        const res = await axios.get(`${API_BASE_URL}/api/v1/sarekart/saredetails`);
        setSarees(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load sarees');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

const addtocart=(sareimg)=>{
    localStorage.setItem("imgsrc",{sareimg})
    alert("saree added")

n  }

    
  return (
    <div className="container mt-5">
      <div className="row">
        {sarees.map((saree) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            key={saree._id}
          >
            <div className="card my-3" style={{ height: "580px" }}>
              <img
                src={saree.sareimg}
                className="card-img-top img-fluid"
                alt={saree.sarename}
                style={{ height: "400px", objectFit: "cover" }}
              />
             

              <div className="details">
                <p className="saree-name">{saree.sarename}</p>
                <div className="price-style">
                <p className="price-tag">RS.{saree.sareprice}</p>
                <p className="strike-price">RS.{saree.wrongprice}</p>
                </div>
              </div>

               <div className="box">
                <p className="add-cart" onClick={()=>addingitems(saree)}>Add To Cart</p>
                <p className="buy-now">Buy Now</p>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
