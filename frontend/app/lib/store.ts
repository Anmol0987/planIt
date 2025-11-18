import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),
}));
