import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    return Promise.reject(error);
  }
);

// ==================== AUTH APIs ====================
export const authAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
};

// ==================== STUDENT APIs ====================
export const studentAPI = {
  // Get all students with pagination, sorting, and search
  getAll: (params = {}) => {
    const {
      page = 0,
      size = 10,
      sortBy = 'id',
      direction = 'asc',
      keyword = ''
    } = params;
    
    return axiosInstance.get('/students', {
      params: { page, size, sortBy, direction, keyword }
    });
  },

  // Get student by ID
  getById: (id) => axiosInstance.get(`/students/${id}`),

  // Create new student
  create: (data) => axiosInstance.post('/students', data),

  // Update student
  update: (id, data) => axiosInstance.put(`/students/${id}`, data),

  // Delete student
  delete: (id) => axiosInstance.delete(`/students/${id}`),

  // Search by course
  searchByCourse: (course, page = 0, size = 10) => 
    axiosInstance.get('/students/search/course', {
      params: { course, page, size }
    }),

  // Search by city
  searchByCity: (city, page = 0, size = 10) => 
    axiosInstance.get('/students/search/city', {
      params: { city, page, size }
    }),

  // Search by marks range
  searchByMarks: (min, max, page = 0, size = 10) => 
    axiosInstance.get('/students/search/marks', {
      params: { min, max, page, size }
    }),
};

export default axiosInstance;
