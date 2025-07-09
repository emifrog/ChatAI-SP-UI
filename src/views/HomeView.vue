<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import robotImage from '../assets/robot.png';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

// Fonction pour rediriger vers la page de chat
const goToChat = () => {
  router.push('/chat');
};

// Fonction pour rediriger vers la page d'inscription
const goToRegister = () => {
  router.push('/auth');
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <img :src="robotImage" alt="" class="mx-auto w-24 h-24 mb-4" />
      <h1 class="text-2xl font-semibold mb-4 text-center">
        Welcome To Chat AI
      </h1>

      <input
        type="text"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        placeholder="Name"
        v-model="name"
      />
      <input
        type="email"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none"
        placeholder="Password"
        v-model="password"
      />

      <button
        @click="goToChat"
        class="w-full p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start Chat
      </button>

      <button
        @click="goToRegister"
        class="w-full p-2 mt-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
      >
        S'inscrire
      </button>

      <p v-if="error" class="text-red-400 text-center mt-2">{{ error }}</p>
    </div>
  </div>
</template>