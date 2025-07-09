import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChatView from '../views/ChatView.vue';
import AuthView from '../views/AuthView.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', component: HomeView },
  { 
    path: '/chat', 
    component: ChatView,
    meta: { requiresAuth: true }
  },
  { 
    path: '/auth', 
    component: AuthView,
    meta: { guest: true }
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isGuestRoute = to.matched.some(record => record.meta.guest);

  if (requiresAuth && !authStore.isAuthenticated) {
    // Rediriger vers la page d'authentification si l'utilisateur n'est pas connecté
    next('/auth');
  } else if (isGuestRoute && authStore.isAuthenticated) {
    // Rediriger vers le chat si l'utilisateur est déjà connecté
    next('/chat');
  } else {
    next();
  }
});