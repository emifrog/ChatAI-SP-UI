import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  userId: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async register(name: string, email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
          name,
          email,
          password,
        });

        const { token, user } = response.data;
        
        this.setAuthData(token, user);
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Erreur lors de l\'inscription';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
          email,
          password,
        });

        const { token, user } = response.data;
        
        this.setAuthData(token, user);
        return true;
      } catch (error: any) {
        this.error = error.response?.data?.error || 'Email ou mot de passe incorrect';
        return false;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
    },

    setAuthData(token: string, user: User) {
      this.token = token;
      this.user = user;
      this.isAuthenticated = true;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },

    // Méthode pour configurer les en-têtes d'authentification pour les requêtes axios
    getAuthHeaders() {
      return {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
    },
  },
});
