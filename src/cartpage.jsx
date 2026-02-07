import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  
  savecart,
  singleitemprice,
  
 
  clearCart
} from "./utilities/cart";
import './cartpage.css'
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const history=useNavigate()
  
  const [cart, setCart] = useState([]);
  const [price,setprice]=useState(0)

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refresh = () => setCart(getCart());
  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      (item._id === id || item.id === id)
        ? { ...item, qty: (Number(item.qty) || 1) + 1 }
        : item
    );

    setCart(updatedCart);      
    savecart(updatedCart);     
  };

  const decreaseQty = (id) => {
  const updatedCart = cart.map(item =>
    (item._id === id || item.id === id)
      ? { ...item, qty: (Number(item.qty) > 1 ? Number(item.qty) - 1 : 1) }
      : item
  );

  setCart(updatedCart);
  savecart(updatedCart);
};


 useEffect(() => {
  let sum = 0;

  cart.forEach(item => {
    const priceValue = Number(item.sareprice);
    sum += priceValue * item.qty;
  });

  setprice(sum);
}, [cart]);

  if (cart.length === 0) {
    return <h3 className="text-center mt-5">Cart is empty</h3>;
  }

 

    return (
      <div className="container mt-4">
        <h2 className="cart-title">My Cart</h2>

        {cart.map(item => {
          const priceValue = Number(item.sareprice) || 0;
          const qtyValue = Number(item.qty) || 1;
          const itemTotal = priceValue * qtyValue;

          return (
            <div key={item._id} className="cart-item border p-3 mb-3">
              <div className="item-left">
                <img src={item.sareimg} alt={item.sarename} />
              </div>

              <div className="item-mid">
                <h5 className="item-name">{item.sarename}</h5>
                <p className="item-price">{item.sareprice}</p>
                <p className="item-sub">{item.wrongprice}</p>
              </div>

              <div className="item-right">
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => { decreaseQty(item._id); refresh(); }}>−</button>
                  <span className="qty-value">{qtyValue}</span>
                  <button className="qty-btn" onClick={() => { increaseQty(item._id); refresh(); }}>+</button>
                </div>

                <div className="item-total">{`RS.${itemTotal}`}</div>

                <button className="btn btn-danger remove-btn" onClick={() => { removeFromCart(item._id || item.id); refresh(); }}>Remove</button>
              </div>
            </div>
          )
        })}


        <div className="cart-summary d-flex justify-content-between align-items-center">
          <button className="btn btn-warning" onClick={() => { clearCart(); refresh(); }}>Clear Cart</button>
          <h4 className="summary-total">Total: <span className="total-amount">RS.{price}</span></h4>
        </div>

        <div className="buy-opt" onClick={()=>history('/buy-now-page')}>
          <div className="buy-now">Buy Now</div>
        </div>
      </div>
    );
  }
          
