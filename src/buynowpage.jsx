import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "./utilities/cart";
import axios from "axios";
import "./buynowpage.css";

export default function BuyNowPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    landmark: "",
    village: "",
    mandal: "",
    district: "",
    state: "",
    pincode: ""
  });

  // Load cart & calculate total
  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);

    let sum = 0;
    cartData.forEach(item => {
      const price = Number(item.sareprice);
      sum += price * item.qty;
    });

    setTotal(sum);
  }, []);

  // Address input handler
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Proceed to payment (save address to backend then navigate)
  const proceedToPayment = async () => {
    try {
      setIsProcessing(true);
       const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://sare-kart-backend-production.up.railway.app/';
const res = await axios.post(`${API_BASE_URL}/api/v1/sarekart/useradress`,address);
      const savedAddress = res.data || address;
      localStorage.setItem("deliveryAddress", JSON.stringify(savedAddress));
      navigate("/payment");
    } catch (err) {
      console.error(err);
      alert('Failed to save address. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return <h3 className="text-center mt-5">No items to checkout</h3>;
  }

 // Place order
  const placeOrder = async () => {
    const orderData = {
      cart,
      total,
      address,
      paymentMethod,
      userid // Get user ID from localStorage or cookies
    };
    try {
      setIsProcessing(true);
       const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://sare-kart-backend-production.up.railway.app/';
const res = await axios.post(`${API_BASE_URL}/api/v1/sarekart/createorder`,orderData, {
        withCredentials: true // Include cookies for userid
      });
      const placedOrder = res.data || orderData;
      localStorage.setItem("latestOrder", JSON.stringify(placedOrder));
      
      // Show success animation
      setShowSuccessAnimation(true);
      
      // Redirect after animation completes (2.5 seconds)
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
      setIsProcessing(false);
    }
  }

  return (
    <div className="buy-container container mt-4">
      {showSuccessAnimation && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-checkmark">
              <div className="checkmark-circle"></div>
              <div className="checkmark-line"></div>
            </div>
            <h2 className="success-title">Order Placed Successfully!</h2>
            <p className="success-message">Thank you for your order. Redirecting to home page...</p>
          </div>
        </div>
      )}
      <h2 className="buynow-title">Buy Now</h2>

      <div className="buy-grid">
        <div className="products-col">
          <div className="products-card">
            <h4 className="section-title">Order Summary</h4>

            {cart.map(item => {
              const price = Number(item.sareprice);
              const itemTotal = price * item.qty;

              return (
                <div key={item._id} className="product-row">
                  <img src={item.sareimg} alt={item.sarename} />
                  <div className="product-info">
                    <div className="prod-name">{item.sarename}</div>
                    <div className="prod-qty">Qty: {item.qty}</div>
                  </div>
                  <div className="prod-price">RS.{itemTotal}</div>
                </div>
              );
            })}

            <div className="cart-total">
              <div>Cart Total</div>
              <div className="cart-total-amt">RS.{total}</div>
            </div>
          </div>
        </div>

        <div className="form-col">
          <div className="form-card">
            <h4 className="section-title">Delivery Address</h4>

            <div className="form-row">
              <input
                className="form-control"
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleChange}
              />
              <input
                className="form-control"
                name="mobile"
                placeholder="Mobile Number"
                value={address.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                className="form-control"
                name="landmark"
                placeholder="Landmark"
                value={address.landmark}
                onChange={handleChange}
              />
              <input
                className="form-control"
                name="village"
                placeholder="Village / Town"
                value={address.village}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                className="form-control"
                name="mandal"
                placeholder="Mandal"
                value={address.mandal}
                onChange={handleChange}
              />
              <input
                className="form-control"
                name="district"
                placeholder="District"
                value={address.district}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                className="form-control"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleChange}
              />
              <input
                className="form-control"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
              />
            </div>

            <h4 className="mt-3">Choose Payment Method</h4>
            <div className="payment-row">
              <label className={`payment-pill ${paymentMethod === 'COD' ? 'active' : ''}`}>
                <input type="radio" name="payment" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
                Cash on Delivery
              </label>

              
            </div>

            <div className="actions">
              
              <button className="btn btn-primary place-btn" onClick={placeOrder} disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}