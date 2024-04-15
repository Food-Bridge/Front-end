import axios from 'axios';

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000,
});


function viewsCount() {
    axios.interceptors.response.use(response => {
        const setCookieHeader = response.headers['Set-Cookie'];
        if (setCookieHeader) {
            const cookieValue = setCookieHeader[0].split(';')[0];
            console.log(cookieValue)
            document.cookie = `user_${loginUser}_hit=${cookieValue}; httpOnly; path=/`;
        }

        return response;
    }, error => {
        return Promise.reject(error);
    });
}

export default viewsCount