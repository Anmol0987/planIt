import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/app/lib/api";

type User = {
  id: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
  refreshAccessToken: () => Promise<void>;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      hydrated: false,
      setHydrated: (value) => set({ hydrated:value }),

      setAuth: (user, token, refreshToken) =>
        set({ user, token, refreshToken }),
      updateAccessToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, refreshToken: null }),
      refreshAccessToken: async () => {
        try {
          const refreshToken = get().refreshToken;
          if (!refreshToken) return;
          console.log(refreshToken)
          const res = await api.post("/auth/refresh", { refreshToken });
          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;

          if (newAccessToken && newRefreshToken) {
            set({ token: newAccessToken,
              refreshToken:newRefreshToken
             });
            console.log("Access token refreshed successfully");
          }
        } catch (err) {
          console.error("Failed to refresh token:", err);
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
