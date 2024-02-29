import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    console.log("axios config : ", config);
    return config;
  },

  (error) => {
    console.log("axios config : ", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axios config : ", response);
    return response;
  },

  (error) => {
    console.log("axios config : ", error);
    return Promise.reject(error);
  }
)

export default axiosInstance
