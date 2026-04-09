import { create } from 'zustand';
import { Instance } from '../lib/Instance';

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
  logout: () => set({ user: null, isAuthenticated: false, authChecked: true }),

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