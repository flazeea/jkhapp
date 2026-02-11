<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <ProfileHeader />
    <div class="flex flex-col gap-4 p-4 rb-medium" style="font-size: 14px;">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full bg-white rounded-4xl drop-shadow-lg overflow-hidden transition-all duration-700"
        :class="{ 'h-[59px]': !expandedItems[index], 'h-auto': expandedItems[index] }"
      >
        <div
          class="h-[59px] flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          @click="toggleExpand(index)"
        >
          <div class="sf-medium text-sm">{{ item.date }} &#8226; {{ item.service }}</div>
          <span class="sf-medium text-sm" :style="{ color: item.amount >= 0 ? '#6FE597' : '#E56F6F' }">
            {{ item.amount >= 0 ? '+' : '' }}{{ item.amount }}
          </span>
        </div>
        <div
          v-if="expandedItems[index]"
          class="px-4 pb-6 pt-5 bg-[#F6F6FF] animate-expand"
        >
          <div class="flex justify-between items-center text-[#3A3A3A]">
            <div class="rb-light" style="font-size: 13;">Документы по операции</div>
            <Icon name="mingcute:right-line" size="15" />
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const expandedItems = ref<{ [key: number]: boolean }>({})

const items = [
  { date: '16.08.25', service: 'Все услуги', amount: -43000 },
  { date: '16.08.25', service: 'Все услуги', amount: 43000 },
]

const toggleExpand = (index: number) => {
  expandedItems.value[index] = !expandedItems.value[index]
}
</script>

<style scoped>
@keyframes expand {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-expand {
  animation: expand 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style>