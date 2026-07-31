import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL 
    ? `${process.env.REACT_APP_API_BASE_URL}/api` 
    : 'http://localhost:8081/api';

axios.interceptors.request.use(config => {
    // Don't send Authorization header for login or register endpoints
    if (config.url?.includes('/users/login') || config.url?.includes('/users/register')) {
        return config;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.authdata) {
        config.headers.Authorization = `Basic ${user.authdata}`;
    }
    return config;
});

// Add a response interceptor to catch 401 errors globally
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // If Spring Security rejects the token, clear it so it doesn't break future requests
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export const getEvents = () => {
    return axios.get(`${API_URL}/events`);
};

export const getEvent = (eventId: string) => {
    return axios.get(`${API_URL}/events/${eventId}`);
};

export const deleteEvent = (eventId: string) => {
    return axios.delete(`${API_URL}/events/${eventId}`);
};

export const createEvent = (event: any) => {
    return axios.post(`${API_URL}/events`, event);
};

export const bookSeats = (eventId: string, data: any) => {
    return axios.post(`${API_URL}/events/${eventId}/book`, data);
};

export const cancelSeats = (eventId: string, data: any) => {
    return axios.post(`${API_URL}/events/${eventId}/cancel`, data);
};

export const register = (user: any) => {
    return axios.post(`${API_URL}/users/register`, user);
};

export const login = (user: any) => {
    return axios.post(`${API_URL}/users/login`, user).then(response => {
        if (response.data && response.data.success) {
            const authdata = window.btoa(user.username + ':' + user.password);
            const userData = {
                username: user.username,
                authdata: authdata
            };
            localStorage.setItem('user', JSON.stringify(userData));
        }
        return response;
    });
};

export const getBookedEvents = (username: string) => {
    return axios.get(`${API_URL}/users/${username}/bookings`);
};
