import axios from 'axios';
import store from '../redux/store';
import Swal from 'sweetalert2';

const REFRESH_URL = `${process.env.REACT_APP_URK}/users/token/refresh/`;
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
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
    Swal.fire({
      icon: 'warning',
      title: '알림',
      html: '다시 로그인해주세요.',
      showCancelButton: false,
      confirmButtonText: '확인',
    }).then(() => {
      window.location.href = '/users/signin';
    });
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.request.use(async (config) => {
  const isLoggedIn = store.getState().auth.isLoggedIn;
  if (isLoggedIn) {
    try {
      let access = getAccessTokenFromCookie();
      if (access) {
        config.headers['Authorization'] = `Bearer ${access}`;
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: '알림',
        html: '다시 로그인해주세요.',
        showCancelButton: false,
        confirmButtonText: '확인',
      }).then(() => {
        window.location.href = '/users/signin';
      });
      return Promise.reject(error);
    }
  }
  return config;
});

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
        Swal.fire({
          icon: 'warning',
          title: '알림',
          html: '다시 로그인해주세요.',
          showCancelButton: false,
          confirmButtonText: '확인',
        }).then(() => {
          window.location.href = '/users/signin';
        });
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
