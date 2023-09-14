import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
        'Access-Control-Allow-Origin' : 'http://localhost:3000/',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
)

export default axiosInstance;
