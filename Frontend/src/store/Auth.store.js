import { create } from 'zustand';
import { Instance } from '../lib/Instance';
import { useNavigate } from 'react-router-dom';


function callNavigate(){
  const navigate= useNavigate();
  navigate("/login");
}

export const useAuthStore = create((set) => ({
  
  user: null,
  isAuthenticated: false,
  authChecked: false,
  loading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuthChecked: (value) => set({ authChecked: value }),
  setLoading: (value) => set({ loading: value }),
  setError: (error) => set({ error }),
  logout: async () => {
    
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    console.error("Logout failed", err);
  }

  set({
    user: null,
    isAuthenticated: false,
    authChecked: true,
  });

  callNavigate();
},

  loadAuth: async () => {
    set({ loading: true, error: null });

    try {
      const response = await Instance.get('auth/me');
      set({
        user: response.data.user,
        isAuthenticated: true,
        authChecked: true,
      });
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        authChecked: true,
        error: error?.response?.data?.message || error?.message || 'Auth validation failed',
      });
    } finally {
      set({ loading: false });
    }
  },
}));