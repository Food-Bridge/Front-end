import axios from 'axios';

const REFRESH_URL = 'http://localhost:8000/users/login/refresh';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers) return config;

    // 토큰 만료 여부 확인
    const isTokenExpired = (token) => {
      if (!token) return true; // 토큰이 없으면 만료된 것으로 간주합니다.

      const currentTime = Math.floor(Date.now() / 1000); // 현재 시간(UNIX 타임스탬프)
      const tokenExpiration = token.exp; // 토큰의 만료 시간

      return currentTime >= tokenExpiration; // 현재 시간이 토큰의 만료 시간 이후인지 확인합니다.
    };

    let token = localStorage.getItem('access');
    if (token && isTokenExpired(token)) {
      try {
        const {
          data: { access },
        } = await axios.get(REFRESH_URL);
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

// 응답 인터셉터를 axiosInstance에 설정합니다.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(error);
    }

    config.sent = true;
    const access = await getRefreshToken();

    if (access) {
      config.headers.Authorization = access;
    }

    return axios(config);
  }
);

// 토큰을 갱신하는 함수
const getRefreshToken = async () => {
  try {
    const {
      data: { access, refresh },
    } = await axios.get(REFRESH_URL);

    localStorage.setItem('access', access);

    if (refresh !== null) {
      localStorage.setItem('refresh', refresh);
    }

    return access;
  } catch (e) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
};

export default axiosInstance;
