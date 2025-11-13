import axios from "axios";
import { useAuthStore } from "./store";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = token;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAuth, logout, user } =
      useAuthStore.getState();
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/auth/refresh", { refreshToken });
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data;
        setAuth(user!, newAccessToken, newRefreshToken);
        originalRequest.headers["Authorization"] = newAccessToken;
        return api(originalRequest);
      } catch (err) {
        logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
