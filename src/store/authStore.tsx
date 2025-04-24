import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Puedes extender JwtPayload si tu token tiene más propiedades
interface User extends JwtPayload {
  [key: string]: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (token: string) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
  checkAuth: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (token: string) => {
        set({ isLoading: true });

        try {
          const userData = jwtDecode<User>(token);
          set({
            token,
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error("Error al procesar el token:", error);
          set({ isLoading: false, isAuthenticated: false });
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      validateToken: async () => {
        set({ isLoading: true });

        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const { token } = get();
          if (!token) {
            set({ isLoading: false, isAuthenticated: false });
            return false;
          }

          const userData = jwtDecode<User>(token);
          const isExpired = userData.exp! * 1000 < Date.now();

          if (isExpired) {
            get().logout();
            set({ isLoading: false, isAuthenticated: false });
            return false;
          }

          set({ user: userData, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          console.error("Token inválido:", error);
          get().logout();
          set({ isLoading: false, isAuthenticated: false });
          return false;
        }
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
