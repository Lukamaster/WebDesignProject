import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const { openCart, cartQuantity } = useShoppingCart();

  function toggleDrawer() {
    setOpenedDrawer(!openedDrawer);
  }

  function changeNav(event) {
    if (openedDrawer) {
      setOpenedDrawer(false);
    }
  }

  function logOutUser(e) {
    e.preventDefault();
    sessionStorage.clear("jwtToken");
    history.push("/login");
  }

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <FontAwesomeIcon
              icon={["fab", "bootstrap"]}
              className="ms-1"
              size="lg"
            />
            <span className="ms-2 h5">Shop</span>
          </Link>

          <div
            className={
              "navbar-collapse offcanvas-collapse " +
              (openedDrawer ? "open" : "")
            }
          >
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="" className="nav-link" replace onClick={changeNav}>
                  Today's Deals
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products/all"
                  className="nav-link"
                  replace
                  onClick={changeNav}
                >
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products/all"
                  className="nav-link"
                  replace
                  onClick={changeNav}
                >
                  Office
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products/all"
                  className="nav-link"
                  replace
                  onClick={changeNav}
                >
                  Gift Cards
                </Link>
              </li>
              {props.isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <a href="#" className="nav-link pr-3" onClick={logOutUser}>
                      Logout
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/users"
                      className="nav-link"
                      replace
                      onClick={changeNav}
                    >
                      Users
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    replace
                    onClick={changeNav}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
            <button
              type="button"
              className="btn btn-outline-dark me-3 d-none d-lg-inline"
              onClick={openCart}
            >
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
              <span className="ms-3 badge rounded-pill bg-dark">
                {cartQuantity}
              </span>
            </button>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={["fas", "user-alt"]} />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/" className="dropdown-item" onClick={changeNav}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item" onClick={changeNav}>
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn btn-outline-dark">
              <FontAwesomeIcon icon={["fas", "shopping-cart"]} />

              <span className="ms-3 badge rounded-pill bg-dark">0</span>
            </button>
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
