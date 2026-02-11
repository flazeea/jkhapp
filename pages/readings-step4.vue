<template>
  <div class="bg-white w-full min-h-screen flex flex-col">

    <main class="flex-1 px-4 pt-6 pb-4 flex flex-col pt-30" :class="{ 'blur-sm': showPaymentModal }">
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
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:edit-2-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full border border-[#6B89E1] bg-white flex items-center justify-center">
            <Icon name="mingcute:camera-2-line" class="text-[#6B89E1] text-xl" />
          </div>
        </div>
      </div>

      <!-- Заголовок -->
      <h1 class="text-center text-1xl rb-semibold text-[#3E3E3E] mb-6">
        Загрузите фотографию счетчиков
      </h1>

      <!-- Область загрузки фото -->
      <div class="flex flex-col items-center justify-center">
        <div v-if="!uploadedPhoto" class="bg-[#F6F6FF] rounded-3xl w-full max-w-sm h-64 flex flex-col items-center justify-center mb-6">
          <div class="rounded-full w-20 h-20 flex items-center justify-center mb-1">
            <img src="/icon.png" alt="gallery" class="w-10 h-10" />
          </div>
          <p class="text-[#6B89E1] text-sm text-center px-6">
            Выбрать файл или фотографию
          </p>
        </div>

        <div v-else class="bg-[#F4F6FF] rounded-3xl w-full max-w-sm h-64 flex items-center justify-center mb-6 relative overflow-hidden">
          <img :src="uploadedPhoto" alt="Uploaded meter photo" class="w-full h-full object-cover" />
          <button @click="removePhoto" class="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            <Icon name="mingcute:close-fill" class="text-[#6B89E1]" />
          </button>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          capture="environment"
          class="hidden"
          @change="handleFileUpload"
        />
      </div>

      <!-- Кнопка продолжения -->
      <div class="mt-6">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-sm tracking-wide font-medium disabled:bg-[#C2C7F0]"
          @click="handlePayment"
        >
          ПРОДОЛЖИТЬ
        </button>
      </div>
    </main>

    <AppFooter v-if="!showPaymentModal" />
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
                stroke-width="8"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="animate-checkmark"
              />
            </svg>
          </div>

          <!-- Сумма оплаты -->
          <div class="text-center">
            <div class="text-2xl font-bold text-[#1F2937] mb-2">
              Данные отправленны
            </div>
          </div>

          <!-- Пустое пространство для выравнивания -->
          <div class="flex-1"></div>

          <!-- Кнопка готово -->
          <button
            @click="closePaymentModal"
            class="absolute bottom-10 w-[70%] h-14 rounded-2xl bg-[#6B89E1] text-white text-sm tracking-wide font-medium hover:bg-[#5573C8] active:bg-[#4963B0]"
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
const fileInput = ref(null);
const uploadedPhoto = ref(null);
const showPaymentModal = ref(false);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedPhoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
};

const handlePayment = () => {
  showPaymentModal.value = true;
};

const removePhoto = () => {
  uploadedPhoto.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleContinue = () => {
  console.log('Фотография загружена, переход к подтверждению');
  router.push('/readings-step5');
};
</script>

<style scoped>
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
