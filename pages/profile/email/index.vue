<template>
  <div class="bg-white w-full max-h-screen flex flex-col">
    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">
    <!-- Header with back button -->
    <div class="flex items-center p-4">
      <NuxtLink to="/profile" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col px-4">
      <h2 class="rb-bold mb-8" style="font-size: 25px;">Укажите новую почту</h2>
      
      <div class="flex items-center gap-2 mb-8">
        <input 
          v-model="emailInput" 
          type="email" 
          placeholder="example@mail.com"
          class="flex-1 outline-none rb-regular border-b border-[#6B89E1] pb-2 text-sm"
          style="font-size: 16px;"
        />
        <Icon v-if="emailInput" name="mingcute:eraser-fill" size="20" class="text-[#6B89E1]" />
      </div>
    </div>

    <!-- Button -->
    <div class="p-4">
      <button @click="goToVerify" :disabled="!emailInput" :class="{'opacity-50 cursor-not-allowed': !emailInput}" class="w-full bg-[#6B89E1] text-white py-3 rounded-2xl rb-medium disabled:opacity-50">
        ПРОДОЛЖИТЬ
      </button>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emailInput = ref('');

const goToVerify = () => {
  navigateTo('/profile/email/verify');
};
</script>

<style scoped>
</style>
