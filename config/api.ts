const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  auth: {
    signup: `${API_BASE_URL}/api/users/signup`,
    login: `${API_BASE_URL}/api/users/login`,
  },
  tasks: {
    base: `${API_BASE_URL}/api/tasks`,
    byId: (id: string) => `${API_BASE_URL}/api/tasks/${id}`,
  },
  suggestions: {
    base: `${API_BASE_URL}/api/suggestions`,
  },
};
