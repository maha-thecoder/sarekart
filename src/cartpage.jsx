import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  
  savecart,
  
 
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
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    setCart(updatedCart);      
    savecart(updatedCart);     
  };

  const decreaseQty = (id) => {
  const updatedCart = cart.map(item =>
    item.id === id
      ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
      : item
  );

  setCart(updatedCart);
  savecart(updatedCart);
};


 useEffect(() => {
  let sum = 0;

  cart.forEach(item => {
    const priceValue = Number(item.sareprice.replace("RS.", ""));
    sum += priceValue * item.qty;
  });

  setprice(sum);
}, [cart]);

  if (cart.length === 0) {
    return <h3 className="text-center mt-5">Cart is empty</h3>;
  }

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {cart.map(item => (
        <div key={item.id} className="row border p-3 mb-3">
          <div className="col-md-3">
            <img src={item.sareimg} width="100%" />
          </div>

          <div className="col-md-6">
            <h5>{item.sarename}</h5>
            <p>{item.sareprice}</p>

           
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-danger"
              onClick={() => {
                removeFromCart(item.id);
                refresh();
              }}
            >
              Remove
            </button>
          </div>
           <div className="col-md-4">
            <button
              onClick={() => {
                decreaseQty(item.id);
                refresh()
               
              }}
            >−</button>

            <span style={{ margin: "0 10px" }}>{item.qty>0?item.qty:1}</span>

            <button
              onClick={() => {
                increaseQty(item.id);
                refresh()
                
              }}
            >+</button>
          </div>
        </div>
        
      ))}


<h4>Total:{price}</h4>
      

      <button className="btn btn-warning" onClick={() => {
        clearCart();
        refresh();
      }}>
        Clear Cart
      </button>

      <div className="buy-opt" onClick={()=>history('/buy-now-page')}>
        <div className="buy-now" style={{backgroundColor:"red"}}>
          Buy Now
        </div>
      </div>
    </div>
  );
}
