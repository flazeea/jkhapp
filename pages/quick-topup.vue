<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">
    <ProfileHeader />

    <main class="flex-1 px-4 pt-6 pb-4 flex flex-col">
      <!-- Заголовок -->
      <h1 class="text-center text-2xl rb-semibold text-[#3E3E3E] mb-6">
        Быстрое пополнение
      </h1>

      <!-- Сумма -->
      <div class="bg-[#F4F6FF] rounded-2xl p-6 mb-6">
        <div class="text-2xl rb-regular text-[#1F2937] mb-2">
          {{ inputAmount }} ₽
        </div>
        <div class="text-xs flex justify-center rb-regular text-[#9CA3AF]">
          Сумма задолженности : 4300
        </div>
      </div>

      <!-- Клавиатура -->
      <div class="flex flex-col rb-bold justify-center gap-3">
        <!-- Ряд 1-3 -->
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="num in [1, 2, 3]"
            :key="num"
            @click="addDigit(num)"
            class="h-14 rounded-xl bg-white text-4xl font-semibold text-[#1F2937] hover:bg-[#F9FAFB] active:bg-[#F3F4F6]"
          >
            {{ num }}
          </button>
        </div>

        <!-- Ряд 4-6 -->
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="num in [4, 5, 6]"
            :key="num"
            @click="addDigit(num)"
            class="h-14 rounded-xl bg-white text-4xl font-semibold text-[#1F2937] hover:bg-[#F9FAFB] active:bg-[#F3F4F6]"
          >
            {{ num }}
          </button>
        </div>

        <!-- Ряд 7-9 -->
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="num in [7, 8, 9]"
            :key="num"
            @click="addDigit(num)"
            class="h-14 rounded-xl bg-white text-4xl font-semibold text-[#1F2937] hover:bg-[#F9FAFB] active:bg-[#F3F4F6]"
          >
            {{ num }}
          </button>
        </div>

        <!-- Ряд 0 и удаление -->
        <div class="grid grid-cols-3 gap-3">
          <div></div>
          <button
            @click="addDigit(0)"
            class="h-14 rounded-xl bg-white text-4xl font-semibold text-[#1F2937] hover:bg-[#F9FAFB] active:bg-[#F3F4F6]"
          >
            0
          </button>
          <button
            @click="deleteDigit"
            class="h-14 rounded-xl text-[#6B89E1] text-4xl font-semibold flex items-center justify-center"
          >
            <Icon name="mingcute:eraser-fill" />
          </button>
        </div>
      </div>

      <!-- Кнопка оплаты -->
      <div class="mt-6 mb-24">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-lg tracking-wide rb-medium disabled:bg-[#C2C7F0] disabled:cursor-not-allowed"
          :disabled="inputAmount === '0'"
          @click="goToPay"
        >
          К ОПЛАТЕ
        </button>
      </div>
    </main>

    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputAmount = ref('0');
const maxLength = 10;

const addDigit = (digit) => {
  if (inputAmount.value === '0') {
    inputAmount.value = String(digit);
  } else if (inputAmount.value.length < maxLength) {
    inputAmount.value += String(digit);
  }
};

const deleteDigit = () => {
  if (inputAmount.value.length > 1) {
    inputAmount.value = inputAmount.value.slice(0, -1);
  } else {
    inputAmount.value = '0';
  }
};

const goToPay = () => {
  router.push({ path: '/quick-topup-pay', query: { amount: inputAmount.value } });
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
