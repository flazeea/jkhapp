<template>
  <div class="bg-white w-full min-h-screen flex flex-col">

    <main class="flex-1 px-4 pt-6 pb-4 flex flex-col pt-30">
      <!-- Шаги -->
      <div class="flex justify-center gap-1 mb-6">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:hashtag-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:device-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full border border-[#6B89E1] bg-white flex items-center justify-center">
            <Icon name="mingcute:edit-2-line" class="text-[#6B89E1] text-xl" />
          </div>
          <div class="h-px w-8 bg-[#E0E4FF]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#F4F6FF] flex items-center justify-center">
            <Icon name="mingcute:camera-2-line" class="text-[#C2C7F0] text-xl" />
          </div>
        </div>
      </div>

      <!-- Заголовок -->
      <h1 class="text-center text-2xl rb-semibold text-[#3E3E3E] mb-6">
        Введите показания
      </h1>

      <!-- Поле ввода показаний -->
      <div class="rounded-2xl p-6 mb-6 flex flex-col items-center">
        <input
          v-model="readingValue"
          type="text"
          inputmode="numeric"
          class="rb-regular text-left bg-transparent outline-none border-b-1 border-[#6B89E1] w-full max-w-xs mb-2 text-[#1F2937]"
          style="font-size: 18px;"
          placeholder="00000000000000,00000"
          maxlength="20 "
        />
      </div>

      <!-- Кнопка продолжения -->
      <div class="bottom-1 mt-65.25">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-sm tracking-wide font-medium disabled:bg-[#C2C7F0]"
          :disabled="readingValue.length === 0"
          @click="handleContinue"
        >
          ПРОДОЛЖИТЬ
        </button>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const readingValue = ref('');

const handleContinue = () => {
  console.log('Показания прибора:', readingValue.value);
  router.push('/readings-step4');
};
</script>

<style scoped>
input::placeholder {
  color: #D1D5DB;
}
</style>
