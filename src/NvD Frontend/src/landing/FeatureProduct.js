import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct({product}) {
  let id = product.id;
  let prodUrl = "/products/view/" + id;

  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={Image}
        />
        <div className="card-body">
          <h5 className="card-title text-center">{product.productName}</h5>
          <p className="card-text text-center text-muted">{"$" + product.price}</p>
          <div className="d-grid gap-2">
            <Link to={prodUrl} className="btn btn-outline-dark" replace>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
