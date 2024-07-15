// utils/authService.ts
import api from '@/utils/api';
import axios from 'axios';
import Cookies from 'js-cookie';

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('api/login/', { username, password });
        console.log("Login response", response);
        Cookies.set('token', response.data.access);
        Cookies.set('csrftoken', response.data.csrf_token);
        return response;
    } catch (error: any) {
        console.error('Login Error:', error.response ? error.response.data : error.message);
        throw new Error('Login Error: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    }
};


export const signup = async (username: string, password: string) => {
    try {
        const response = await api.post('api/user/signup/', { username, password });
        console.log("Singup response", response);
        return response.data; 
    } catch (error: any) {
        throw new Error('Signup Error: ', error);
    }
};


export const logout = async () => {
    try {
        const csrfToken = Cookies.get('csrftoken');
        const accessToken = Cookies.get('token');
        const response = await api.post('api/logout/', {}, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${accessToken}`
            }
        });
        Cookies.remove('token', { path: '/' });
        Cookies.remove('csrftoken', { path: '/' });
        console.log("Logout response", response);
        return response;
    } catch (error: any) {
        console.error('Logout Error:', error.response ? error.response.data : error.message);
        throw new Error('Logout Error: ' + (error.response ? JSON.stringify(error.response.data) : error.message));
    }
};


