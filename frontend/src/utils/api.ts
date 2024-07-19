import axios from 'axios';
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken') || '',
    }
});


api.interceptors.request.use((config) => {
    const csrfToken = Cookies.get('csrftoken');
    const accessToken = Cookies.get('token');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response || {};
        if (status === 401) {
            if (!error.config._retry) {
                error.config._retry = true;
                Cookies.remove('token', { path: '/' });
                Cookies.remove('csrftoken', { path: '/' });
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);


export default api;


