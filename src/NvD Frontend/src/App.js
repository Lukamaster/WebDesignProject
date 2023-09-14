import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch,withRouter, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import {
  ShoppingCartProvider,
  useShoppingCart,
} from "./context/ShoppingCartContext";
import Login from "./template/auth/Login";
import Register from "./template/auth/Register";
import {useState,useEffect} from 'react'
import Users from "./template/Users";

// $env:NODE_OPTIONS = "--openssl-legacy-provider"

function App(location) {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=>{
    const token = sessionStorage.getItem("jwtToken")
    if(token){
      setIsAuthenticated(true)
    }
    if (location.state && location.state.from === "/login") {
      window.location.reload();
    }
  },[location.state])



  return (
    <ShoppingCartProvider>
      <Template isAuthenticated={isAuthenticated}>
          <Switch>
            <Route path="/products" exact={true}>
              <ProductList />
            </Route>
            <Route path="/products/:categoryName" exact={true}>
              <ProductList />
            </Route>
            <Route
              path="/products/view/:productId"
              component={withRouter(ProductDetail)}
              exact={true}
            ></Route>
            <Route path="/login" isAuthenticated={isAuthenticated} exact={true}>
              <Login />
            </Route>
            <Route path="/register" isAuthenticated={isAuthenticated} exact={true}>
              <Register/>
            </Route>
            <Route path="/" exact={true}>
              <Landing />
            </Route>
            <Route path="/users" exact={true}>
              <Users/>
            </Route>
          </Switch>
      </Template>
    </ShoppingCartProvider>
  );
}

export default App;
