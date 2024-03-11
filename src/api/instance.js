import axios from 'axios';

const REFRESH_URL = 'http://localhost:8000/users/token/refresh/';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
});

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh');
    const { data: { access } } = await axios.post(REFRESH_URL, { refresh: refreshToken });
    localStorage.setItem('access', access);
    return access;
  } catch (error) {
    console.error('토큰 갱신에 실패했습니다.', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers) return config;

    const isTokenExpired = (token) => {
      if (!token) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExpiration = token.exp;

      return currentTime >= tokenExpiration;
    };

    let token = localStorage.getItem('access');
    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('axios config : ', config);
    return config;
  },

  (error) => {
    console.error('axios config : ', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        alert('로그인이 필요합니다')
        window.location.href = '/users/signin';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
