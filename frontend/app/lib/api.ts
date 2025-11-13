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
    const store = useAuthStore.getState();
    const refreshToken = store.refreshToken;

    console.log("inside interceptor response");
    console.log("refreshToken before calling refresh:", refreshToken);


    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Handle 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If no refresh token → logout
      if (!refreshToken) {
        store.logout();
        return Promise.reject(error);
      }

      try {
        // Refresh
        const res = await axios.post(
          "http://localhost:3000/api/v1/auth/refresh",
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data;

        // Update in store
        store.setAuth(store.user!, newAccessToken, newRefreshToken);

        // Update original request headers
        originalRequest.headers["Authorization"] = newAccessToken;

        // Retry original request
        return api(originalRequest);
      } catch (err) {
        store.logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
