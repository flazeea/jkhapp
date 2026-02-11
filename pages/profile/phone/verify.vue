<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-4 pt-30">
      <NuxtLink to="/profile/phone" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col px-4 items-center">
      <h2 class="rb-bold mb-2 text-center" style="font-size: 25px;">Введите код из смс</h2>
      
      <div class="flex gap-2 mb-8 mt-6">
        <input 
          v-for="(digit, index) in 6"
          :key="index"
          v-model="codeDigits[index]"
          type="text"
          maxlength="1"
          inputmode="numeric"
          class="w-13 h-13 text-center outline-none bg-[#F6F6FF] rounded-2xl text-lg rb-medium"
          style="font-size: 16px;"
          @input="handleInput(index)"
          @keydown="handleKeydown(index, $event)"
        />
      </div>

      <div class="flex gap-1 mb-1">
        <span class="rb-light text-[#9D9D9D]" style="font-size: 12px;">Отправить повторно через &#8226;</span>
        <span class="rb-light text-[#9D9D9D]" style="font-size: 12px;">47 с</span>
      </div>

      <p class="rb-light text-[#6B89E1] text-center" style="font-size: 12px;">Мне нечего не приходит</p>
    </div>

    <!-- Button -->
    <div class="p-4">
      <button :disabled="!isCodeFilled" :class="{'opacity-50 cursor-not-allowed': !isCodeFilled}" class="w-full bg-[#6B89E1] text-white py-3 rounded-2xl rb-medium disabled:opacity-50">
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const codeDigits = ref(['', '', '', '', '', '']);

const isCodeFilled = computed(() => codeDigits.value.every(digit => digit !== ''));

const handleInput = (index: number) => {
  if (codeDigits.value[index] && index < 5) {
    const nextInput = document.querySelectorAll('input')[index + 1];
    nextInput?.focus();
  }
};

const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !codeDigits.value[index] && index > 0) {
    const prevInput = document.querySelectorAll('input')[index - 1];
    codeDigits.value[index - 1] = '';
    prevInput?.focus();
  }
};
</script>

<style scoped>
</style>
