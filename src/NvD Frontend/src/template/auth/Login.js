import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import AxiosRepository from "../../axiosRepo/axiosRepository";

const Login = (props) => {

  const history = useHistory()

  useEffect(()=>{
    if(props.isAuthenticated){
      history.push("/")
    }
  },[])

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response =  await AxiosRepository.login(formData).then(result => {
      saveJwtToken(result.data.token)
      isAdmin(result.data.admin)
      setLoggedInUser(true)
    })
    history.push("/")
  };

  const setLoggedInUser = (userIsLoggedIn) => {
    if (userIsLoggedIn === true) {
      sessionStorage.setItem("isLoggedIn", true)
    }
  }

  const saveJwtToken = (token) => {
    sessionStorage.setItem("jwtToken",token)
  }

  const isAdmin = (admin) => {
    sessionStorage.setItem("isAdmin", admin)
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Login Form</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <div>
                  Or register <a href="/register">here</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
