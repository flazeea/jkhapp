<template>
  <div class="bg-white w-full min-h-screen flex flex-col pt-30">

    <main class="flex-1 px-4 pt-6 pb-4 flex flex-col" :class="{ 'blur-sm': showPaymentModal }">
      <!-- Шаги -->
      <div class="text-right pb-5 text-sm text-[#6B89E1] rb-light">
          Квитанция
        </div>
      <div class="flex justify-center gap-6 mb-6">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:device-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:list-check-2-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div>
          <div class="h-9 w-9 rounded-full border border-[#6B89E1] bg-white flex items-center justify-center">
            <Icon name="mingcute:currency-rubel-2-fill" class="text-[#6B89E1] text-xl" />
          </div>
        </div>
      </div>

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
            class="h-14 rounded-xl  text-[#6B89E1] text-4xl font-semibold hover:bg-[#5573C8] active:bg-[#4963B0] flex items-center justify-center"
          >
            <icon name="mingcute:eraser-fill" />
          </button>
        </div>
      </div>

      <!-- Кнопка оплаты -->
      <div class="mt-6">
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

    <AppFooter v-if="!showPaymentModal" />

    <!-- Модальное окно с результатом оплаты -->
    <transition name="modal">
      <div v-if="showPaymentModal" class="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="rounded-3xl px-6 py-12 flex flex-col items-center gap-6 max-w-sm mx-4">
          <!-- Галочка в круге с анимацией -->
          <div class="relative w-24 h-24">
            <svg
              class="w-full h-full animate-scale-in"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Синий круг -->
              <circle cx="50" cy="50" r="48" stroke="#6B89E1" stroke-width="4" />
              
              <!-- Галочка -->
              <path
                d="M30 50 L45 65 L70 35"
                stroke="#4CAF50"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="animate-checkmark"
              />
            </svg>
          </div>

          <!-- Сумма оплаты -->
          <div class="text-center">
            <div class="text-3xl font-bold text-[#1F2937] mb-2">
              {{ inputAmount }} ₽
            </div>
            <div class="text-sm text-[#9CA3AF]">
              Сумма задолженности - 0 ₽
            </div>
          </div>

          <!-- Ссылка на документы -->
          <button
            @click="openDocuments"
            class="text-[#6B89E1] text-sm font-medium hover:underline"
          >
            Документы по операции
          </button>

          <!-- Пустое пространство для выравнивания -->
          <div class="flex-1"></div>

          <!-- Кнопка готово -->
          <button
            @click="closePaymentModal"
            class="absolute bottom-10 w-[70%] h-14 rounded-2xl bg-[#6B89E1] text-white text-lg tracking-wide font-medium hover:bg-[#5573C8] active:bg-[#4963B0]"
          >
            ГОТОВО
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const inputAmount = ref('0');
const maxLength = 10;
const showPaymentModal = ref(false);

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

const handlePayment = () => {
  console.log('Оплата суммы:', inputAmount.value);
  showPaymentModal.value = true;
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
};
const goToPay = () => {
  router.push({ path: '/quick-topup-pay', query: { amount: inputAmount.value } });
};

const openDocuments = () => {
  console.log('Открыть документы по операции');
  alert('Документы по операции');
};
</script>

<style scoped>
/* Плавные переходы для кнопок */
button {
  transition: all 0.2s ease;
}

/* Размытие фона */
main {
  transition: filter 0.3s ease;
}

/* Анимация появления модального окна */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  backdrop-filter: none;
}

.modal-leave-to {
  opacity: 0;
  backdrop-filter: none;
}

.modal-enter-from > div {
  transform: scale(0.9);
}

.modal-leave-to > div {
  transform: scale(0.9);
}

/* Анимация масштабирования круга с галочкой */
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Анимация рисования галочки */
@keyframes draw-checkmark {
  0% {
    stroke-dashoffset: 100;
    stroke-dasharray: 100;
  }
  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: 100;
  }
}

.animate-checkmark {
  animation: draw-checkmark 0.6s ease-out 0.3s forwards;
  stroke-dashoffset: 100;
  stroke-dasharray: 100;
}

/* Размытие основного контента */
:global(main.blur-sm) {
  filter: blur(4px);
}
</style>
