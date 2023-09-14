import axios from "../axios/axiosInterceptor"


const AxiosRepository = {
  fetchProductsByCategory: (categoryName) => {
    return axios.get(`/products/${categoryName}`);
  },

  fetchProducts: (category) => {
    if (category != null) {
      return axios.get(`/products/${category}`);
    } else {
      return axios.get(`/products/all`);
    }
  },

  fetchProduct: (id) => {
    return axios.get(`/products/view/${id}`);
  },

  fetchAllCategories: () => {
    return axios.get(`/categories/all`);
  },

  fetchSearchQuery: (query) => {
    return axios.get(`/products/search/${query}`);
  },

  fetchPaymentIntent: (headers, body) => {
    return axios.post(`/checkout/create-payment-intent`, headers, body);
  },
  toPaymentPage: (cartItems) => {
    return axios.post(`/checkout/create-checkout-session`, cartItems, {
      "content-type": "application/json"
    });
  },

  addProductToCart:(product) => {
    return axios.put(`/cart/add-product`, product)
  },

  removeProductFromCart:(productId, cartId) => {
    return axios.put(`/cart/remove-product/${productId}?productId=${cartId}`)
  },

  updateCart:(id) => {
    return axios.get(`/cart/${id}`)
  },
  
  login: (loginDto) => {
    return axios.post("/auth/login", loginDto, {
      "content-type": "application/json"
    });
  },
  register: (registerDto) => {
    return axios.post("/auth/register", registerDto, {
      "content-type": "application/json"
    });
  },
  fetchUsers:()=>{
    return axios.get("/users");
  },
  addProduct:(productDto) => {
    return axios.post(`/products/add`, productDto)
  },
};

export default AxiosRepository;
