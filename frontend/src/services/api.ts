import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    // include cookies 
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('user');
            // force reload of page clearing any react state
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// for logging purposes
api.interceptors.request.use(
    (config) => {
        // Logging the request - useful for your development workspace
        if (import.meta.env.DEV) {
            console.log(`🚀 Request sent to: ${config.url}`);
        }

        // withCredentials is already set globally, but the interceptor 
        // ensures it's enforced for all instances.
        config.withCredentials = true;

        return config;
    },
    (error) => {
        // Handle request errors (e.g., network issues before the request leaves)
        return Promise.reject(error);
    }
);

export default api;