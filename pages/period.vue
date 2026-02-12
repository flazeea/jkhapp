<template>
  <div class="bg-white w-full min-h-screen flex flex-col">

    <main class="flex-1 px-4 pt-6 pb-4 flex flex-col">
      <!-- Шаги -->
      <div class="flex justify-center gap-6 mb-6">
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full bg-[#6B89E1] flex items-center justify-center">
            <Icon name="mingcute:device-line" class="text-white text-xl" />
          </div>
          <div class="h-px w-8 bg-[#6B89E1]" />
        </div>
        <div class="flex items-center gap-2">
          <div class="h-9 w-9 rounded-full border border-[#6B89E1] bg-white flex items-center justify-center">
            <Icon name="mingcute:list-check-2-line" class="text-[#6B89E1] text-xl" />
          </div>
          <div class="h-px w-8 bg-[#E0E4FF]" />
        </div>
        <div>
          <div class="h-9 w-9 rounded-full bg-[#F4F6FF] flex items-center justify-center">
            <Icon name="mingcute:currency-rubel-2-fill" class="text-[#C2C7F0] text-xl" />
          </div>
        </div>
      </div>

      <!-- Заголовок -->
      <h1 class="text-center text-2xl rb-semibold text-[#3E3E3E] mb-5">
        Выберите период учета
      </h1>

      <!-- Календарь -->
      <div class="flex-1 flex flex-col">
        <!-- Месяц/Год и навигация -->
        <div class="flex justify-between items-center mb-5 px-2">
          <button @click="previousMonth" class="text-[#6B89E1] font-medium text-xs">
            &lt; {{ monthNames[currentMonth] }}
          </button>
          <span class="font-semibold text-[#3E3E3E] text-sm">{{ currentYear }}</span>
          <button @click="nextMonth" class="text-[#6B89E1] font-medium text-xs">
            {{ monthNames[(currentMonth + 1) % 12] }} &gt;
          </button>
        </div>

        <!-- Дни недели -->
        <div class="grid grid-cols-7 gap-1.5 mb-3 px-2">
          <div v-for="day in weekDays" :key="day" class="text-center text-xs text-gray-500 font-medium">
            {{ day }}
          </div>
        </div>

        <!-- Дни месяца -->
        <div class="grid grid-cols-7 gap-1.5 px-2 mb-5">
          <div
            v-for="day in calendarDays"
            :key="day"
            @click="selectDate(day)"
            :class="[
              'h-8 flex items-center justify-center rounded-full text-xs cursor-pointer transition-all',
              day === 0 ? 'invisible' : '',
              !isDateInMonth(day) ? 'text-gray-300 cursor-default' : '',
              isDateSelected(day) ? 'bg-[#6B89E1] text-white font-semibold' : '',
              isDateInRange(day) && !isDateSelected(day) ? 'bg-[#F6F6FF] text-[#6B89E1]' : '',
              !isDateInRange(day) && !isDateSelected(day) && isDateInMonth(day) ? 'text-[#3E3E3E] hover:bg-gray-100' : ''
            ]"
          >
            {{ day === 0 ? '' : day }}
          </div>
        </div>

        <!-- Выбранные даты -->
        <div class="grid grid-cols-2 justify-between gap-4 px-2 mb-5 pb-5 border-gray-200">
          <div class="border-b border-gray-200">
            <div class="text-xs text-gray-500 mb-1">Дата начала</div>
            <div class="rb-semibold text-sm text-[#3E3E3E]">{{ formatDateDisplay(startDate) }}</div>
          </div>
          <div class="border-b border-gray-200">
            <div class="text-xs text-gray-500 mb-1">Дата окончания</div>
            <div class="rb-semibold text-sm text-[#3E3E3E]">{{ formatDateDisplay(endDate) }}</div>
          </div>
        </div>

        <!-- Сумма задолженности -->
        <div class="text-center text-sm text-[#3E3E3E] font-medium mb-2">
          Сумма задолженности : 4300 ₽
        </div>
        <div class="text-center text-sm text-[#6B89E1] rb-light">
          Квитанция
        </div>
      </div>

      <!-- Кнопка продолжения -->
      <div class="mb-15">
        <button
          type="button"
          class="w-full h-14 rounded-2xl bg-[#6B89E1] text-white text-sm tracking-wide font-medium"
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const startDate = ref(new Date(currentYear.value, currentMonth.value, 1));
const endDate = ref(today);

const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7;
  
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(0);
  }
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }
  
  return days;
});

const isDateInMonth = (day) => {
  return day !== 0;
};

const isDateSelected = (day) => {
  if (day === 0) return false;
  const date = new Date(currentYear.value, currentMonth.value, day);
  return (date.toDateString() === startDate.value.toDateString()) || 
         (date.toDateString() === endDate.value.toDateString());
};

const isDateInRange = (day) => {
  if (day === 0 || !isDateInMonth(day)) return false;
  const date = new Date(currentYear.value, currentMonth.value, day);
  return date >= startDate.value && date <= endDate.value;
};

const selectDate = (day) => {
  if (day === 0 || !isDateInMonth(day)) return;
  
  const selectedDate = new Date(currentYear.value, currentMonth.value, day);
  
  if (!startDate.value) {
    startDate.value = selectedDate;
  } else if (!endDate.value) {
    if (selectedDate < startDate.value) {
      endDate.value = startDate.value;
      startDate.value = selectedDate;
    } else {
      endDate.value = selectedDate;
    }
  } else {
    // Обе даты выбраны - проверяем, какую границу менять
    const distToStart = Math.abs(selectedDate - startDate.value);
    const distToEnd = Math.abs(selectedDate - endDate.value);
    
    if (selectedDate < startDate.value) {
      startDate.value = selectedDate;
    } else if (selectedDate > endDate.value) {
      endDate.value = selectedDate;
    } else if (distToStart <= distToEnd) {
      startDate.value = selectedDate;
    } else {
      endDate.value = selectedDate;
    }
  }
};

const formatDateDisplay = (date) => {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
};

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const handleContinue = () => {
  console.log('Выбранный период:', {
    start: formatDateDisplay(startDate.value),
    end: formatDateDisplay(endDate.value)
  });
  router.push('/checkout');
};
</script>

<style scoped>
main {
  overflow-y: auto;
}
</style>
