import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import AxiosRepository from "../axiosRepo/axiosRepository";
import Product from "../products/Product";


function Landing() {

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(()=> {
        const fetchData = async () => {

            setLoading(true);
            try {
                const response = await AxiosRepository.fetchProducts().then(result => setProducts(result.data))
            } catch (error) {
                console.log(error)
            }
            setLoading(false);
        };
        fetchData();
    }, [])

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          You're Here! Welcome to our amazing selection of PC parts that are sure to serve your building needs,
            all the way from basic office computers to the latest gaming PC's, we've got you covered.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">Today's Deals</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {!loading && Array.isArray(products) && (
              products.slice(0,6).map((product, i) => (
                  <FeatureProduct key={product.id} product={product}/>
              ))
          )}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
