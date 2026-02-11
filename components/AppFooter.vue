<template>
  <footer class="w-full bg-[#F6F6FF] pt-0 pb-6 absolute left-0 bottom-0 content-end">
    <div class="flex justify-between px-8">
      
      <div 
        v-for="item in menuItems" 
        :key="item.name" 
        class="flex flex-col items-center cursor-pointer w-20"
        @click="activeItem = item.name"
      >
        <div 
          :class="[
            'h-[4px] w-15 rounded-full mb-3 transition-colors duration-300',
            activeItem === item.name ? 'bg-[#3E3E3E]' : 'bg-transparent'
          ]"
        ></div>

        <div 
          :class="[
            'text-base transition-colors duration-300',
            activeItem === item.name ? 'rb-bold text-[#3E3E3E]' : 'rb-regular text-black'
          ]"
        >
          {{ item.name }}
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue'

onMounted(() => {
  // Проверяем, что мы в браузере и объект Telegram существует
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp

    // Сообщаем телеграму, что приложение готово
    tg.ready()

    // Пытаемся развернуть на весь экран
    try {
      tg.requestFullscreen()
      tg.disableVerticalSwipes()
    } catch (e) {
      console.log('Fullscreen not supported in this version', e)
    }

    // Дополнительно можно развернуть окно (expand)
    tg.expand()
  }
})

const router = useRouter();
const route = useRoute();

// Состояние активной вкладки: по умолчанию — актуальный маршрут
const activeItem = computed({
  get() {
    // Если мы на страницах оплаты, выбирать и оставаться на "Оплата"
    const paymentRoutes = ['/oplata', '/period', '/checkout'];
    if (paymentRoutes.includes(route.path)) {
      return 'Оплата';
    }
    
    const current = menuItems.find((item) => item.link === route.path);
    return current ? current.name : 'Главная';
  },
  set(value: string) {
    const target = menuItems.find((item) => item.name === value);
    if (target) {
      router.push(target.link);
    }
  },
});

const menuItems = [
  { name: 'Главная', link: '/' },
  { name: 'Оплата', link: '/oplata' },
  { name: 'Тарифы', link: '/tariffs' },
  { name: 'История', link: '/history' },
];
</script>

<style scoped>
/* Дополнительные стили если нужны */
</style>