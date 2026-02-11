<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center p-4 pt-30">
      <NuxtLink to="/profile" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
    </div>

    <main class="flex-1 px-4 pb-4 flex flex-col">
      <!-- Заголовок -->
      <h1 class="text-2xl rb-semibold text-[#3E3E3E] mb-6">
        Выберете адрес
      </h1>

      <!-- Колесо выбора адреса -->
      <div class="flex-1 flex flex-col max-h-[500px] mb-6">
        <div class="picker-wrapper">
          <div class="picker-fade-top"></div>
          <div class="picker-fade-bottom"></div>
          <div class="picker-column">
            <div class="picker-highlight"></div>
            <div class="picker-scroller" id="addressScroller"></div>
          </div>
        </div>
      </div>

      <!-- Spacer -->
      <div class="flex-1"></div>

      <!-- Кнопка продолжить -->
      <div class="mb-4">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-sm tracking-wide rb-medium hover:bg-[#5573C8] active:bg-[#4963B0]"
          @click="handleContinue"
        >
          ПРОДОЛЖИТЬ
        </button>
      </div>

      <!-- Поддержка -->
      <div class="text-center text-sm rb-light text-[#9CA3AF] mb-10">
        Нет вашего адреса? Обратитесь в поддержку
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const addresses = [
  { icon: '', name: 'Адрес' },
  { icon: '', name: 'Адрес' },
  { icon: '', name: 'Адрес' },
  { icon: '', name: 'Адрес' },
  { icon: '', name: 'Адрес' }
];

const selectedAddress = ref(addresses[0]);

class WheelPicker {
  constructor(element, items, initialIndex, onChange) {
    this.element = element;
    this.items = items;
    this.itemHeight = 50;
    this.containerHeight = 450;
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
        item.style.fontSize = '30px';
      } else if (distance === 1) {
        item.style.opacity = '0.7';
        item.style.fontSize = '28px';
      } else {
        item.style.opacity = '0.4';
        item.style.fontSize = '26px';
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
    document.getElementById('addressScroller'),
    addresses,
    2,
    (address, index) => {
      selectedAddress.value = address;
      console.log('Выбран адрес:', address.name);
    }
  );
});

const handleContinue = () => {
  console.log('Выбран адрес:', selectedAddress.value.name);
  router.push('/profile');
};
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}

.picker-wrapper {
  position: relative;
  width: 100%;
  height: 450px;
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
  height: 60px;
  background: linear-gradient(180deg, rgba(246, 246, 255, 0.8) 50%, transparent 100%);
  pointer-events: none;
  z-index: 2;
}

.picker-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(180deg, transparent 50%, rgba(246, 246, 255, 0.8) 100%);
  pointer-events: none;
  z-index: 2;
}
</style>
