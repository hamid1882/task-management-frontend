/* eslint-disable */

import { API_ENDPOINTS } from "@/config/api";
import axios from "axios";

// Types
interface User {
  email: string;
  password: string;
}

interface Task {
  id?: string;
  title: string;
  description?: string;
  status?: string;
}

// Create axios instance
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  },
});

// Auth services
export const authService = {
  signup: (userData: User) => api.post(API_ENDPOINTS.auth.signup, userData),

  login: (credentials: User) => api.post(API_ENDPOINTS.auth.login, credentials),
};

// Task services
export const taskService = {
  getAllTasks: () => api.get(API_ENDPOINTS.tasks.base),

  getTask: (id: string) => api.get(API_ENDPOINTS.tasks.byId(id)),

  createTask: (task: Task) => api.post(API_ENDPOINTS.tasks.base, task),

  updateTask: (id: string, task: Task) =>
    api.put(API_ENDPOINTS.tasks.byId(id), task),

  deleteTask: (id: string) => api.delete(API_ENDPOINTS.tasks.byId(id)),
};

// Suggestion services
export const suggestionService = {
  getSuggestions: () => api.get(API_ENDPOINTS.suggestions.base),
};

// Axios interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
