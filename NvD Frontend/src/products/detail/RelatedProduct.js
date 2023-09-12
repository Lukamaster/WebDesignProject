import Image from "../../nillkin-case-1.jpg";
import { Link, withRouter } from "react-router-dom";

const RelatedProduct = ({product}) => {
  let id = product.id;
  let prodUrl = "/products/view/" + id;

  return (
    <Link
      to={prodUrl}
      className="col text-decoration-none"
      href="!#"
      replace
    >
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark cover"
          height="200"
          alt=""
          src={Image}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product.productName}
          </h5>
          <p className="card-text text-center text-muted">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

//export default RelatedProduct;
export default withRouter(RelatedProduct)
