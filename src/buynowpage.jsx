import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "./utilities/cart";
import "./buynowpage.css";

export default function BuyNowPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [total, setTotal] = useState(0);

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
      const price = Number(item.sareprice.replace("RS.", ""));
      sum += price * item.qty;
    });

    setTotal(sum);
  }, []);

  // Address input handler
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Proceed to payment
  const proceedToPayment = () => {
    localStorage.setItem("deliveryAddress", JSON.stringify(address));
    navigate("/payment");
  };

  if (cart.length === 0) {
    return <h3 className="text-center mt-5">No items to checkout</h3>;
  }

   // Place order
  const placeOrder = () => {
    const orderData = {
      cart,
      total,
      address,
      paymentMethod
    };
}

  return (
    <div className="container mt-4">
      <h2>Buy Now</h2>

      {/* PRODUCT SUMMARY */}
      {cart.map(item => {
        const price = Number(item.sareprice.replace("RS.", ""));
        const itemTotal = price * item.qty;

        return (
          <div
            key={item.id}
            className="row border p-2 mb-3 align-items-center"
          >
            <div className="col-md-2">
              <img
                src={item.sareimg}
                width="70"
                height="70"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="col-md-4">
              <strong>{item.sarename}</strong>
              <p>Qty: {item.qty}</p>
            </div>

            <div className="col-md-3">
              <p>{item.sareprice}</p>
            </div>

            <div className="col-md-3">
              <strong>RS.{itemTotal}</strong>
            </div>
          </div>
        );
      })}

      <h4 className="mt-3">
        Cart Total: <strong>RS.{total}</strong>
      </h4>

      <hr />

      {/* DELIVERY ADDRESS */}
      <h3>Delivery Address</h3>
      <div className="border p-3 rounded mb-4">

        <div className="row mb-2 ">
          <div className="col-md-6 mb-4">
            <input
              className="form-control"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <input
              className="form-control"
              name="mobile"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row ">
          <div className="col-md-6 mb-4">
            <input
              className="form-control"
              name="landmark"
              placeholder="Landmark"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-4">
            <input
              className="form-control"
              name="village"
              placeholder="Village / Town"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              name="mandal"
              placeholder="Mandal"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              name="district"
              placeholder="District"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              name="state"
              placeholder="State"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      {/* PAYMENT METHOD */}
      <h3>Choose Payment Method</h3>
      <div className="border p-3 rounded mb-4">

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          <label className="form-check-label">
            Cash on Delivery
          </label>
        </div>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "ONLINE"}
            onChange={() => setPaymentMethod("ONLINE")}
          />
          <label className="form-check-label">
            Pay Online
          </label>
        </div>

      </div>

      {/* PLACE ORDER */}
      <button className="btn btn-success" onClick={placeOrder}>
        Place Order
      </button>

    
    </div>
  );
}
