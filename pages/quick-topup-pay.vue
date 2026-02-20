<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">

    <main class="flex-1 px-4 pt-10 pb-4 flex flex-col" :class="{ 'blur-sm': showModal }">
      <!-- Сумма -->
      <div class="bg-[#F4F6FF] rounded-2xl p-6 mb-6">
        <div class="text-2xl rb-regular text-[#1F2937] mb-2">
          {{ amount }} ₽
        </div>
        <div class="text-xs flex justify-center rb-regular text-[#9CA3AF]">
          Сумма задолженности : 4300
        </div>
      </div>

      <!-- Колесо выбора способа оплаты -->
      <div class="flex-1 flex flex-col max-h-[180px] mb-6">
        <div class="picker-wrapper">
          <div class="picker-fade-top"></div>
          <div class="picker-fade-bottom"></div>
          <div class="picker-column">
            <div class="picker-highlight"></div>
            <div class="picker-scroller" id="paymentScroller"></div>
          </div>
        </div>
      </div>

      <!-- СПБ: Иконки банков -->
      <div v-if="selectedMethod === 'spb'" class="mb-6">
        <div class="flex justify-center gap-3">
          <!-- Тинькофф -->
          <div class="bg-[#FFDD2D] rounded-2xl h-[58px] w-[90px] flex justify-center items-center cursor-pointer hover:scale-105 transition-transform"
               :class="{ 'ring-2 ring-[#6B89E1]': selectedBank === 'tinkoff' }"
               @click="selectedBank = 'tinkoff'">
            <img src="/Vector.png" alt="Тинькофф" class="h-5">
          </div>
          <!-- Сбер -->
          <div class="bg-[#EEEEEE] rounded-2xl h-[58px] w-[90px] flex justify-center items-center cursor-pointer hover:scale-105 transition-transform"
               :class="{ 'ring-2 ring-[#6B89E1]': selectedBank === 'sber' }"
               @click="selectedBank = 'sber'"
               style="background: linear-gradient(135deg, #EEEEEE 0%, #E8F5E9 100%);">
            <img src="/sbericon.png" class="w-6 h-6" alt="Сбер">
          </div>
          <!-- Альфа -->
          <div class="bg-[#EEEEEE] rounded-2xl h-[58px] w-[90px] flex justify-center items-center cursor-pointer hover:scale-105 transition-transform"
               :class="{ 'ring-2 ring-[#6B89E1]': selectedBank === 'alfa' }"
               @click="selectedBank = 'alfa'">
            <img src="/alpha.png" class="w-[13px] h-5" alt="Альфа">
          </div>
        </div>
      </div>

      <!-- По реквизитам: Данные -->
      <div v-if="selectedMethod === 'requisites'" class="mb-6">
        <h2 class="text-center text-xl rb-semibold text-[#3E3E3E] mb-4">Данные реквизитов</h2>

        <div class="bg-[#F4F6FF] rounded-2xl p-5">
          <div class="text-xs rb-light text-[#9CA3AF] mb-2">Добавьте в сообщение с переводом</div>
          <div class="text-lg rb-light text-[#1F2937]">№1333456</div>
        </div>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Кнопка оплаты -->
      <div class="mt-6 mb-24">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-lg tracking-wide rb-medium hover:bg-[#5573C8] active:bg-[#4963B0]"
          @click="handlePay"
        >
          {{ selectedMethod === 'spb' ? 'ОПЛАТИТЬ' : 'ПРОДОЛЖИТЬ' }}
        </button>
      </div>
    </main>

    </div>
    <AppFooter v-if="!showModal" />

    <!-- Модальное окно — СПБ (галочка) -->
    <transition name="modal">
      <div v-if="showModal && selectedMethod === 'spb'" class="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="rounded-3xl px-6 py-12 flex flex-col items-center gap-6 max-w-sm mx-4">
          <!-- Галочка в круге -->
          <div class="relative w-24 h-24">
            <svg class="w-full h-full animate-scale-in" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="#6B89E1" stroke-width="4" />
              <path d="M30 50 L45 65 L70 35" stroke="#4CAF50" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="animate-checkmark" />
            </svg>
          </div>

          <div class="text-center">
            <div class="text-3xl font-bold text-[#1F2937] mb-2">{{ amount }} ₽</div>
            <div class="text-sm text-[#3A3A3A]">Сумма задолженности - 0 ₽</div>
          </div>

          <button @click="openDocuments" class="text-[#6B89E1] text-sm font-medium hover:underline">
            Документы по операции
          </button>

          <div class="flex-1"></div>

          <button
            @click="closeModal"
            class="absolute bottom-10 w-[70%] h-14 rounded-2xl bg-[#6B89E1] text-white text-lg tracking-wide font-medium hover:bg-[#5573C8] active:bg-[#4963B0]"
          >
            ГОТОВО
          </button>
        </div>
      </div>
    </transition>

    <!-- Модальное окно — По реквизитам (часы + Ожидайте подтверждения) -->
    <transition name="modal">
      <div v-if="showModal && selectedMethod === 'requisites'" class="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="rounded-3xl px-6 py-12 flex flex-col items-center gap-6 max-w-sm mx-4">
          <!-- Часы в круге -->
          <div class="relative w-24 h-24 flex items-center justify-center">
            <svg class="w-full h-full animate-scale-in" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" stroke="#6B89E1" stroke-width="4" />
              <!-- Стрелка часов -->
              <line x1="50" y1="50" x2="50" y2="28" stroke="#6B89E1" stroke-width="4" stroke-linecap="round" class="animate-checkmark" />
              <line x1="50" y1="50" x2="35" y2="50" stroke="#6B89E1" stroke-width="4" stroke-linecap="round" class="animate-checkmark" />
              <circle cx="50" cy="50" r="3" fill="#6B89E1" />
            </svg>
          </div>

          <!-- Заголовок -->

          <div class="text-center">
            <div class="text-3xl font-bold text-[#1F2937] mb-2">{{ amount }} ₽</div>
            <div class="text-sm text-[#3A3A3A]">Ожидайте подтверждения</div>
          </div>

          <button @click="openDocuments" class="text-[#6B89E1] text-sm font-medium hover:underline">
            Документы по операции
          </button>

          <div class="flex-1"></div>

          <button
            @click="closeModal"
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const amount = ref(route.query.amount || '0');
const selectedMethod = ref('spb');
const selectedBank = ref('tinkoff');
const showModal = ref(false);

const paymentMethods = [
  { icon: '', name: 'СПБ' },
  { icon: '', name: 'По реквизитам' }
];

class WheelPicker {
  constructor(element, items, initialIndex, onChange) {
    this.element = element;
    this.items = items;
    this.itemHeight = 50;
    this.containerHeight = 150;
    this.onChange = onChange;

    this.currentIndex = initialIndex;

    this.centerPosition = (this.containerHeight - this.itemHeight) / 2;
    this.translateY = this.centerPosition - (this.currentIndex * this.itemHeight);

    this.isDragging = false;
    this.startY = 0;
    this.startTranslate = 0;
    this.velocity = 0;
    this.lastY = 0;
    this.lastTime = 0;
    this.animationId = null;

    this.init();
  }

  init() {
    this.render();
    this.updatePosition(false);
    this.bindEvents();
  }

  render() {
    this.element.innerHTML = this.items.map((item, index) =>
      `<div class="picker-item" data-index="${index}">
        <span class="icon">${item.icon}</span>
        <span class="name">${item.name}</span>
      </div>`
    ).join('');
  }

  updatePosition(animate = true) {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (animate) {
      this.element.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      this.element.style.transition = 'none';
    }

    this.element.style.transform = `translateY(${this.translateY}px)`;
    this.updateItemStyles();
  }

  updateItemStyles() {
    const centeredIndex = Math.round((this.centerPosition - this.translateY) / this.itemHeight);
    const clampedIndex = Math.max(0, Math.min(this.items.length - 1, centeredIndex));

    this.element.querySelectorAll('.picker-item').forEach((item, i) => {
      const distance = Math.abs(i - clampedIndex);
      const isSelected = i === clampedIndex;

      item.classList.toggle('selected', isSelected);

      if (distance === 0) {
        item.style.opacity = '1';
        item.style.fontSize = '26px';
      } else if (distance === 1) {
        item.style.opacity = '0.7';
        item.style.fontSize = '24px';
      } else {
        item.style.opacity = '0.4';
        item.style.fontSize = '22px';
      }
    });
  }

  snapToIndex(index, animate = true) {
    const clampedIndex = Math.max(0, Math.min(this.items.length - 1, index));
    this.currentIndex = clampedIndex;
    this.translateY = this.centerPosition - (clampedIndex * this.itemHeight);
    this.updatePosition(animate);
    this.onChange(this.items[clampedIndex], clampedIndex);
  }

  bindEvents() {
    const getY = (e) => {
      return e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    };

    const handleStart = (e) => {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      this.isDragging = true;
      this.startY = getY(e);
      this.startTranslate = this.translateY;
      this.lastY = this.startY;
      this.lastTime = Date.now();
      this.velocity = 0;

      this.element.style.transition = 'none';
    };

    const handleMove = (e) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const currentY = getY(e);
      const deltaY = currentY - this.startY;
      const currentTime = Date.now();
      const timeDelta = currentTime - this.lastTime;

      if (timeDelta > 0) {
        this.velocity = (currentY - this.lastY) / timeDelta;
      }

      this.lastY = currentY;
      this.lastTime = currentTime;

      let newTranslate = this.startTranslate + deltaY;

      const maxTranslate = this.centerPosition;
      const minTranslate = this.centerPosition - (this.items.length - 1) * this.itemHeight;

      if (newTranslate > maxTranslate) {
        const overscroll = newTranslate - maxTranslate;
        newTranslate = maxTranslate + overscroll * 0.3;
      } else if (newTranslate < minTranslate) {
        const overscroll = minTranslate - newTranslate;
        newTranslate = minTranslate - overscroll * 0.3;
      }

      this.translateY = newTranslate;
      this.element.style.transform = `translateY(${this.translateY}px)`;
      this.updateItemStyles();
    };

    const handleEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      const momentum = this.velocity * 80;
      const targetTranslate = this.translateY + momentum;
      const targetIndex = Math.round((this.centerPosition - targetTranslate) / this.itemHeight);

      this.snapToIndex(targetIndex, true);
    };

    this.element.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    this.element.addEventListener('touchstart', handleStart, { passive: true });
    this.element.addEventListener('touchmove', handleMove, { passive: false });
    this.element.addEventListener('touchend', handleEnd);

    this.element.addEventListener('click', (e) => {
      if (Math.abs(this.velocity) > 0.1) return;

      const item = e.target.closest('.picker-item');
      if (item) {
        const index = parseInt(item.dataset.index);
        this.snapToIndex(index, true);
      }
    });
  }
}

onMounted(() => {
  new WheelPicker(
    document.getElementById('paymentScroller'),
    paymentMethods,
    0,
    (method, index) => {
      selectedMethod.value = index === 0 ? 'spb' : 'requisites';
    }
  );
});

const handlePay = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  router.push('/');
};

const openDocuments = () => {
  alert('Документы по операции');
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}

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

/* Анимация масштабирования */
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

/* Анимация рисования */
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

:global(main.blur-sm) {
  filter: blur(4px);
}

/* Picker styles */
.picker-wrapper {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F6F6FF;
  border-radius: 24px;
}

.picker-column {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.picker-highlight {
  position: absolute;
  width: 90%;
  height: 50px;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  background: transparent;
  border-radius: 12px;
  pointer-events: none;
  z-index: 1;
}

.picker-scroller {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.picker-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  white-space: nowrap;
  padding: 0 16px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  transition: font-size 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: #9CA3AF;
}

.picker-item.selected {
  font-weight: 700;
  font-size: 20px;
  line-height: calc(1.75 / 1.25);
  color: #1F2937;
  letter-spacing: 0.5px;
}

.picker-item .icon {
  font-size: 18px;
  display: inline-block;
}

.picker-item .name {
  display: inline-block;
}

.picker-fade-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(180deg, rgba(246, 246, 255, 0.8) 50%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

.picker-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: linear-gradient(180deg, transparent 50%, rgba(246, 246, 255, 0.8) 100%);
  pointer-events: none;
  z-index: 2;
}
</style>
