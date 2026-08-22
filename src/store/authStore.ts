// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  login: (name: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      login: (name) => set({ token: `demo-token-${name}`, userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "itelect4-auth", // the localStorage key it writes to
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
      }), // save ONLY these two fields
    }
  )
);

export default useAuthStore;