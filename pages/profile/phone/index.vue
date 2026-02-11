<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-4 pt-30">
      <NuxtLink to="/profile" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col px-4">
      <h2 class="rb-bold mb-8" style="font-size: 25px;">Укажите новый номер</h2>
      
      <div class="flex items-center gap-2 mb-6 border-b border-[#6B89E1]">
        <span class="rb-regular " style="font-size: 18px;">+7</span>
        <input 
          v-model="phoneInput" 
          type="tel" 
          class="flex-1 outline-none rb-regular text-sm"
          style="font-size: 16px;"
        />
        <Icon v-if="phoneInput" name="mingcute:eraser-fill" size="20" class="text-[#6B89E1]" />
      </div>

      <p class="rb-light text-[#6B89E1]" style="font-size: 12px;">Обновить номер через Telegram</p>
    </div>

    <!-- Button -->
    <div class="p-4">
      <button @click="goToVerify" :disabled="!phoneInput" :class="{'opacity-50 cursor-not-allowed': !phoneInput}" class="w-full bg-[#6B89E1] text-white py-3 rounded-2xl rb-medium disabled:opacity-50">
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phoneInput = ref('');

const goToVerify = () => {
  navigateTo('/profile/phone/verify');
};
</script>

<style scoped>
</style>
