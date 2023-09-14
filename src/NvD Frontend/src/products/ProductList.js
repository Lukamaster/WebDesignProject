import { Link } from "react-router-dom";
import Product from "./Product";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import AxiosRepository from "../axiosRepo/axiosRepository";
import {useParams} from "react-router-dom";
import AddProduct from "./AddProduct";


function FilterMenuLeft() {

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [brands, setBrands] = useState([])
  

  useEffect(()=> {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AxiosRepository.fetchAllCategories()
        .then(result => setCategories(result.data))
        // if(brands.length === 0) {
          const response2 = await AxiosRepository.fetchProducts()
          .then(result => {
            setProducts(result.data)
            let brandsArr = []
            products.forEach((prod) => {
              if(!brandsArr.includes(prod.productBrand)) {
                brandsArr.push(prod.productBrand)
              }
            })
            setBrands(brandsArr)
            setLoading(false);
          })
        //}
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  },[])

  return (
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item d-none d-lg-block">
          <h5 className="mt-1 mb-2">Browse</h5>
          <div className="d-flex flex-wrap my-2">
            {!loading && (categories.map((category) => {
              return (
                  <Link
                      key={category.id}
                      to={!loading && ("/products/" + category.categoryName)}
                      className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                      replace
                  >
                    {!loading && (category.categoryName)}
                  </Link>
              );
            }))}
          </div>
        </li>
        <li className="list-group-item">
          <h5 className="mt-1 mb-1">Brands</h5>
          <div className="d-flex flex-column">
            {!loading && brands.map((brand, i) => {
              return (
                  <div key={i} className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      {brand}
                    </label>
                  </div>
              );
            })}
          </div>
        </li>
        <li className="list-group-item">
          <h5 className="mt-1 mb-2">Price Range</h5>
          <div className="d-grid d-block mb-3">
            <div className="form-floating mb-2">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Min"
                  defaultValue="100000"
              />
              <label htmlFor="floatingInput">Min Price</label>
            </div>
            <div className="form-floating mb-2">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Max"
                  defaultValue="500000"
              />
              <label htmlFor="floatingInput">Max Price</label>
            </div>
            <button className="btn btn-dark">Apply</button>
          </div>
        </li>
      </ul>
  );
}

function ProductList(props) {
  const [viewType, setViewType] = useState({ grid: true });
  const routeParams = useParams();
  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [inputText, setInputText] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=> {
    const fetchData = async () => {

      setIsAdmin(sessionStorage.getItem("isAdmin"))
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn"))
      setLoading(true);
      try {
        const response = await AxiosRepository.fetchProducts(routeParams.categoryName).then(result => {
          setProducts(result.data)
        })
        const response2 = await AxiosRepository.fetchAllCategories().then(result =>  {
          setCategories(result.data)
          setLoading(false);
        })
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, [])

  const fetchQuery = async (query) => {
    setLoading(true);
    try {
      const response = await AxiosRepository.fetchSearchQuery(query).then(result => {
        setProducts(result.data)
        setLoading(false);

      } )
    } catch (error) {
      console.log(error)
    }
    
  };

  const inputHandler = (e) => {
    //convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleShow = () => setIsOpen(true);

  return (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded">
          <ol className="breadcrumb p-3 mb-0">
            <li className="breadcrumb-item">
              <Link
                  className="text-decoration-none link-secondary"
                  to="/products/all"
                  replace
              >
                All Products
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {routeParams.categoryName}
            </li>
          </ol>
        </nav>

        <div className="h-scroller d-block d-lg-none">
          <nav className="nav h-underline">
            {categories.map((category, i) => {
              return (
                  <div key={i} className="h-link me-2">
                    <Link
                        to="/products"
                        className="btn btn-sm btn-outline-dark rounded-pill"
                        replace
                    >
                      {category.name}
                    </Link>
                  </div>
              );
            })}
          </nav>
        </div>

        <div className="row mb-3 d-block d-lg-none">
          <div className="col-12">
            <div id="accordionFilter" className="accordion shadow-sm">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                      className="accordion-button fw-bold collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFilter"
                      aria-expanded="false"
                      aria-controls="collapseFilter"
                  >
                    Filter Products
                  </button>
                </h2>
              </div>
              <div
                  id="collapseFilter"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFilter"
              >
                <div className="accordion-body p-0">
                  <FilterMenuLeft />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4 mt-lg-3">
          <div className="d-none d-lg-block col-lg-3">
            <div className="border rounded shadow-sm">
              <FilterMenuLeft />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="d-flex flex-column h-100">
              <div className="row mb-3">
                <div className="col-lg-3 d-none d-lg-block">
                </div>
                <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                  {isAdmin &&
                  <div>
                    <button className="btn btn-dark ms-2 d-none d-lg-inline mr-10" onClick={handleShow}>
                      Add
                    </button>
                    <AddProduct isOpen={isOpen} close={() => setIsOpen(false)}></AddProduct>
                  </div>
                  }
                  
                  <div className="input-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search products..."
                        aria-label="search input"
                        onChange={inputHandler}
                    />
                    <button className="btn btn-outline-dark" onClick={() => fetchQuery(inputText)}>
                      <FontAwesomeIcon icon={["fas", "search"]} />
                    </button>
                  </div>
                  <button
                      className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                      onClick={changeViewType}
                  >
                    <FontAwesomeIcon
                        icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                    />
                  </button>
                </div>
              </div>
              <div
                  className={
                      "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                      (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                  }
              > {!loading && Array.isArray(products)? (
                  products.map((product, i) => (
                      <Product product={product} key={product.id} isLoggedIn = {isLoggedIn} isAdmin = {isAdmin}/>
                  ))
              ): <Product product={products} key={products.id}/>
              }
              </div>
              <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing 10 of {products.length}
              </span>
                <nav aria-label="Page navigation example" className="ms-auto">
                  <ul className="pagination my-0">
                    <li className="page-item">
                      <a className="page-link">
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductList;
