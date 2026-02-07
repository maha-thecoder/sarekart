import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./admin-dashboard.css";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = window.location.hostname === 'localhost'
          ? 'http://localhost:4000'
          : 'https://sare-kart-backend-production.up.railway.app';
        const res = await axios.get(`${API_BASE_URL}/api/v1/sarekart/orders`);
        setOrders(res.data?.data || []);
        
      } catch (err) {
        console.error(err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
        
      }
    };

    fetchOrders();
  }, []);


  const formatPrice = (val) => {
    if (typeof val === 'string') {
      return val.replace(/^RS\.?/i, 'RS.');
    }
    return `RS.${val}`;
  };

  if (loading) return (
    <div className="adm-container">
      <div className="adm-spinner" role="status"></div>
    </div>
  );

  if (error) return (
    <div className="adm-container">
      <div className="adm-alert">{error}</div>
    </div>
  );

  return (
    <div className="adm-container container mt-4">
      <h2 className="adm-title">Admin — Orders</h2>
      <div className="adm-actions mb-3">
        <button className="adm-btn adm-btn-outline" onClick={() => navigate('/admin-orders')}>All Orders</button>
        <button className="adm-btn adm-btn-primary" onClick={() => navigate('/admin-add-saree')}>Add Saree</button>
      </div>
      {orders.length === 0 && <div className="adm-empty">No orders found.</div>}

      {orders.map(order => {
        
        
        const address = order.deliveryAddress || order.addressSnapshot || {};
        return (
          <div className="adm-order-card" key={order._id}>
            <div className="adm-order-header">
              <div>
                <strong>Order:</strong> {order._id}
                <div className="adm-muted">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="adm-order-meta">
                <div><strong>Status:</strong> {order.status}</div>
                <div><strong>Payment:</strong> {order.paymentMethod}</div>
                <div><strong>Total:</strong> RS.{order.total}</div>
              </div>
            </div>

            <div className="adm-order-body">
              <div className="adm-order-items">
                {Array.isArray(order.cart) && order.cart.map((item, idx) => {
                  
                   const priceValue = Number(item.sareprice) || 0;
          const qtyValue = Number(item.qty) || 1;
          const itemTotal = priceValue * qtyValue;
                  return (
                    <div className="adm-order-item" key={idx}>
                      <img src={item.sareimg} alt={item.sarename} />
                      <div className="adm-item-info">
                        <div className="adm-item-name">{item.sarename}</div>
                        <div className="adm-item-q">Qty: {qtyValue}</div>
                      </div>
                      <div className="adm-item-price">RS.{itemTotal}</div>
                    </div>
                  )
                })}
              </div>

              <div className="adm-order-address">
                <h5>Delivery Address</h5>
                <div>{address.name}</div>
                <div>{address.mobile}</div>
                <div>{address.landmark}</div>
                <div>{address.village}, {address.mandal}</div>
                <div>{address.district}, {address.state} - {address.pincode}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
