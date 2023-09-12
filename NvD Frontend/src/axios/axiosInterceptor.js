import axiosInstance from "./axios";

const addTokenToRequest = (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  };
  
  const handleRequestError = (error) => {
    return Promise.reject(error);
  };
  
  axiosInstance.interceptors.request.use(
    addTokenToRequest,
    handleRequestError
  );
  
  export default axiosInstance;