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
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      // ✅ Logout: clears both Zustand state and localStorage
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("auth-storage");
      },

      // ✅ Try to get new access token via backend refresh route
      refreshToken: async () => {
        try {
          const res = await api.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );
          const newToken = res.data.accessToken;
          if (newToken) {
            set({ token: newToken });
          } else {
            set({ user: null, token: null });
          }
        } catch (err) {
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
