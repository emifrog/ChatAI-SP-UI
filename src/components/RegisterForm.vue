<template>
  <div class="w-full">
    <div v-if="authStore.error" class="bg-red-900 border border-red-700 text-white px-4 py-3 rounded mb-4">
      {{ authStore.error }}
    </div>
    
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nom</label>
        <input
          id="name"
          v-model="name"
          type="text"
          required
          class="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Votre nom"
        />
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="votre@email.com"
        />
      </div>
      
      <div>
        <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>
      
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">Confirmer le mot de passe</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          class="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
        <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="authStore.loading || !!passwordError"
        class="w-full p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        <span v-if="authStore.loading">Inscription en cours...</span>
        <span v-else>S'inscrire</span>
      </button>
    </form>
    
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-400">
        Déjà un compte?
        <a @click="router.push('/')" class="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer">Retour à l'accueil</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const passwordError = computed(() => {
  if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
    return 'Les mots de passe ne correspondent pas';
  }
  return '';
});

const handleRegister = async () => {
  if (passwordError.value) return;
  
  const success = await authStore.register(name.value, email.value, password.value);
  if (success) {
    router.push('/chat');
  }
};
</script>
