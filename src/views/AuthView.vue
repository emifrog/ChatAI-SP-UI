<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img :src="robotImage" alt="" class="mx-auto w-24 h-24 mb-4" />
      <h1 class="text-center text-2xl font-semibold mb-6">Inscription</h1>
      <div class="p-8 bg-gray-800 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '../components/RegisterForm.vue';
import robotImage from '../assets/robot.png';
</script>
