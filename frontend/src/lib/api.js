import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api", 
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getResources = async (params) => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != null && v !== "")
  );
  const response = await api.get("/resources", { params: cleanParams });
  return response.data;
};

export const getChatSessions = async () => {
  const response = await api.get("/chat/sessions");
  return response.data;
};

export const getChatSession = async (sessionId) => {
  const response = await api.get(`/chat/sessions/${sessionId}`);
  return response.data;
};

export const updateChatSession = async (sessionId, data) => {
  const response = await api.put(`/chat/sessions/${sessionId}`, data);
  return response.data;
};

export const deleteChatSession = async (sessionId) => {
  const response = await api.delete(`/chat/sessions/${sessionId}`);
  return response.data;
};
