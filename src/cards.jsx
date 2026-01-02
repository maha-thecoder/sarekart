import { sarees } from "./saredetails";
import { addingitems } from "./utilities/cart";
import './card.css'

export default function Cards() {

    const addtocart=(sareimg)=>{
        localStorage.setItem("imgsrc",{sareimg})
        alert("saree added")

    }
  return (
    <div className="container mt-5">
      <div className="row">
        {sarees.map((saree) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            key={saree.id}
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
                <p className="price-tag">{saree.sareprice}</p>
                <p className="strike-price">{saree.wrongprice}</p>
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
