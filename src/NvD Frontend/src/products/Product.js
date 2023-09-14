import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddProduct from "./AddProduct";
import { useState } from "react";

const Product = ({product, isLoggedIn, isAdmin}) =>  {
  let id = product.id;
  let prodUrl = "/products/view/" + id;

  const [isOpen, setIsOpen] = useState(false)


  const openEdit = () => {
    setIsOpen(!isOpen)
  }

  const handleShow = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);


  return (
      <div className="col">
        <div className="card shadow-sm">
          <Link to={prodUrl} href="!#" replace>
            <img
                className="card-img-top bg-dark cover"
                height="200"
                alt=""
                src={Image}
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title text-center text-dark text-truncate">
              {product.productName}
            </h5>
            <p className="card-text text-center text-muted mb-0">{"$" + product.price}</p>
            <div className="d-grid d-block">
              {isAdmin ?
              <>
                <AddProduct isOpen={isOpen} close={handleClose} editingProduct={product}></AddProduct>
                <button className="btn btn-outline-dark mt-3" onClick={handleShow}>
                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Edit Product
               </button>
              </>
               
                : isLoggedIn ?
              <button className="btn btn-outline-dark mt-3">
                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
              </button> : 
              <button className="btn btn-outline-dark mt-3">
                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> View Product
              </button> 
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default Product;
