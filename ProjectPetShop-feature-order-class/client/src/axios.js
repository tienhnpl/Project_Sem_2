import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
// Do something before request is sent
const userData = JSON.parse(window.localStorage.getItem('persist:shop/user'));
if (userData && userData.token) {
  const token = userData.token.replace(/"/g, ""); // Loại bỏ dấu ngoặc kép từ token
  config.headers.Authorization = `Bearer ${token}`;
}
return config;


  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);

export default instance;
