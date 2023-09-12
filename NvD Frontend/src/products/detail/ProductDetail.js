import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import {Link, useParams} from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import {useEffect, useState} from "react";
import AxiosRepository from "../../axiosRepo/axiosRepository";
import {useShoppingCart} from "../../context/ShoppingCartContext";

const iconPath =
    "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail(props) {
  function changeRating(newRating) {}
  const routeParams = useParams();

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState([])
  const [cartUpdating, setCartUpdating] = useState(true)
  const [allProducts, setAllProducts] = useState([])

  const {getItemQuantity } = useShoppingCart()

  // 

  const addToCart = async () => {
    setCartUpdating(true)
    const productDto = {
      cartId: 1,
      productId: product.id,
      quantity: 1
    }
    try {
      const addProductToCart = await AxiosRepository.addProductToCart(productDto)
      
    }
    catch (e){
      console.log(e)
    }
    setCartUpdating(false)
  }

  useEffect(()=> {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AxiosRepository.fetchProduct(routeParams.productId).then(result => {
          setProduct(result.data)
        })
        const response2 = await AxiosRepository.fetchProducts().then(result => {
          setAllProducts(result.data)
          setLoading(false)
        })
        const quantity = getItemQuantity(product.id);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  return (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount/>
        <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
          <ol className="breadcrumb p-3">
            <li className="breadcrumb-item">
              <Link className="text-decoration-none link-secondary" to="/products">
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link className="text-decoration-none link-secondary" to={!loading && "/products/" + product.productCategory.categoryName}>
                {!loading && (product.productCategory.categoryName)}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.productName}
            </li>
          </ol>
        </nav>
        <div className="row mb-4">
          <div className="d-none d-lg-block col-lg-1">
            <div className="image-vertical-scroller">
              <div className="d-flex flex-column">
                {Array.from({ length: 10 }, (_, i) => {
                  let selected = i !== 1 ? "opacity-6" : "";
                  return (
                      <a key={i} href="!#">
                        <img
                            className={"rounded mb-2 ratio " + selected}
                            alt=""
                            src={Image}
                        />
                      </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                    className="border rounded ratio ratio-1x1"
                    alt=""
                    src={Image}
                />
              </div>
            </div>

            {/* <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  return (
                    <a key={i} href="!#">
                      <img
                        className="cover rounded mb-2 me-2"
                        width="70"
                        height="70"
                        alt=""
                        src={Image}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div> */}
          </div>

          {/* () => increaseCartQuantity(product.id, product.price) */}

          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{product.productName}</h2>
              <h4 className="text-muted mb-4">{"$" + product.price}</h4>

              <div className="row g-3 mb-4">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100" onClick={addToCart}>
                    Add to cart
                  </button>
                </div>
                <div className="col">
                </div>
              </div>

              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Code</dt>
                <dd className="col-sm-8 mb-3">{product.productCode}</dd>

                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 mb-3">{!loading && (product.productCategory.categoryName)}</dd>

                <dt className="col-sm-4">Manufacturer</dt>
                <dd className="col-sm-8 mb-3">{product.productBrand}</dd>

                <dt className="col-sm-4">Delivers To</dt>
                <dd className="col-sm-8 mb-3">{product.color ? product.color : "N/A"}</dd>

                <dt className="col-sm-4">Warranty</dt>
                <dd className="col-sm-8 mb-3">{product.hasWarranty === "true" ? "Yes" : "No"}</dd>

                <dt className="col-sm-4">Rating</dt>
                <dd className="col-sm-8 mb-3">
                  <Ratings
                      rating={4.5}
                      widgetRatedColors="rgb(253, 204, 13)"
                      changeRating={changeRating}
                      widgetSpacings="2px"
                  >
                    {Array.from({ length: 5 }, (_, i) => {
                      return (
                          <Ratings.Widget
                              key={i}
                              widgetDimension="20px"
                              svgIconViewBox="0 0 19 20"
                              svgIconPath={iconPath}
                              widgetHoverColor="rgb(253, 204, 13)"
                          />
                      );
                    })}
                  </Ratings>
                </dd>
              </dl>

              <h4 className="mb-0">Description</h4>
              <hr />
              <p className="lead flex-shrink-0">
                <small>
                  {product.productDescription}
                </small>
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-4">
            <hr />
            <h4 className="text-muted my-4">Related products</h4>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
              {!loading &&
                (allProducts.map((product, i) => (
                    <RelatedProduct key={i} product={product} />
                )))
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductDetail;
