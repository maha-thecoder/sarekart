import { useEffect, useState } from "react";
import { addingitems } from "./utilities/cart";
import axios from 'axios';
import './card.css'
import './cards-ui.css'
import { useNavigate } from 'react-router-dom'

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
          : 'https://sare-kart-backend-production.up.railway.app';
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

  const navigate = useNavigate()

  const handleAddToCart = (saree) => {
    addingitems(saree)
    // small toast-ish feedback
    alert('Added to cart')
  }

  const handleBuyNow = (saree) => {
    // Save selected item for buy now flow and navigate
    localStorage.setItem('buyNowItem', JSON.stringify({ ...saree, qty: 1 }))
    navigate('/buy-now-page')
  }

    
  return (
    <div className="container mt-5">
      <div className="row">
        {sarees.map((saree) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            key={saree._id}
          >
            <div className="product-card my-3">
              <div className="media">
                <img src={saree.sareimg} alt={saree.sarename} className="media-img" />
              </div>

              <div className="product-body">
                <h3 className="product-title">{saree.sarename}</h3>
                <div className="product-meta">
                  <div className="price">₹{saree.sareprice}</div>
                  <div className="mrp">₹{saree.wrongprice}</div>
                </div>
                <div className="product-actions">
                  <button className="btn btn-add" onClick={() => handleAddToCart(saree)}>Add to cart</button>
                  <button className="btn btn-buy" onClick={() => handleBuyNow(saree)}>Buy now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
