// utils/api.ts
import axios from 'axios';
// import { cookies } from 'next/headers';
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

export default api;