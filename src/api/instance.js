import axios from 'axios';

const REFRESH_URL = 'http://localhost:8000/users/login/refresh';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
});

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
      try {
        const { data: { access } } = await axios.get(REFRESH_URL);
        localStorage.setItem('access', access);
        token = access;
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.', error);
        throw error;
      }
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
    const { config, response: { status } } = error;

    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
