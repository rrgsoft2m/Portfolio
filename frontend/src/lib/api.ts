import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('rrgsoft_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('rrgsoft_token');
            if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// API functions
export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/api/auth/login', { email, password }),
};

export const projectsAPI = {
    getAll: () => api.get('/api/projects'),
    getById: (id: string) => api.get(`/api/projects/${id}`),
    create: (data: any) => api.post('/api/projects', data),
    update: (id: string, data: any) => api.put(`/api/projects/${id}`, data),
    delete: (id: string) => api.delete(`/api/projects/${id}`),
};

export const visitorsAPI = {
    track: (page: string) => api.post('/api/visitors', { page }),
    getStats: () => api.get('/api/visitors'),
};

export const messagesAPI = {
    send: (data: { name: string; email: string; message: string }) =>
        api.post('/api/messages', data),
    getAll: () => api.get('/api/messages'),
    markRead: (id: string) => api.put(`/api/messages/${id}/read`),
    delete: (id: string) => api.delete(`/api/messages/${id}`),
};

export const siteContentAPI = {
    getAll: () => api.get('/api/site-content'),
    update: (data: Record<string, string>) => api.put('/api/site-content', data),
    updateSingle: (key: string, value: string) =>
        api.put(`/api/site-content/${key}`, { value }),
};

export const uploadAPI = {
    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
