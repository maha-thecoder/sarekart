import { sarees } from "./saredetails";
import './card.css'

export default function Cards() {
  return (
    <div className="container mt-5">
      <div className="row">
        {sarees.map((saree) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12"
            key={saree.id}
          >
            <div className="card my-3" style={{ height: "450px" }}>
              <img
                src={saree.sareimg}
                className="card-img-top img-fluid"
                alt={saree.sarename}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <div className="box">
                <p className="add-cart">Add To Cart</p>
                <p className="buy-now">Buy Now</p>
              </div>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
