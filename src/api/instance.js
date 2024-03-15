import axios from 'axios';

const REFRESH_URL = 'http://localhost:8000/users/token/refresh/';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
});

const refreshToken = async () => {
  try {
    const refresh = sessionStorage.getItem('refresh');
    const response = await axios.post(REFRESH_URL, { refresh: refresh });
    const access = response.data.access;
    document.cookie = `accessToken=${access}; httpOnly; path=/`;
    return access;
  } catch (error) {
    throw new Error('토큰 갱신에 실패했습니다.');
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers['Authorization']) {
      try {
        let access = getAccessTokenFromCookie();
        if (access) {
          config.headers['Authorization'] = `Bearer ${access}`;
        }
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.', error);
        throw new Error('토큰 갱신에 실패했습니다.');
      }
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
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const access = await refreshToken();
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (error) {
        console.error('토큰 갱신에 실패했습니다.', error);
        alert('로그인이 필요합니다.');
        window.location.href = '/users/signin';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const getAccessTokenFromCookie = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
  return cookies.accessToken;
};

export default axiosInstance;
