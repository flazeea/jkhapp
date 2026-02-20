<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">
    <!-- Header with back button -->
    <div class="flex items-center p-4">
      <NuxtLink to="/profile" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col px-4">
      <h2 class="rb-bold mb-6" style="font-size: 25px;">Уведомления</h2>
      
      <!-- Notifications section -->
      <div class="p-5 rounded-4xl bg-[#fff] drop-shadow-lg">
        <div class="grid gap-4">
          <!-- Bot notifications -->
          <div class="flex justify-between items-center">
            <span class="rb-light text-[#000]" style="font-size: 13px;">Уведомления в боте</span>
            <button
              @click="toggleBotNotifications"
              :class="botNotifications ? 'bg-[#52DC80]' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
            >
              <span
                :class="botNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
              ></span>
            </button>
          </div>

          <!-- Email notifications -->
          <div class="flex justify-between items-center">
            <span class="rb-light text-[#000]" style="font-size: 13px;">Уведомления на почту</span>
            <button
              @click="toggleEmailNotifications"
              :class="emailNotifications ? 'bg-[#52DC80]' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300"
            >
              <span
                :class="emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const botNotifications = ref(true);
const emailNotifications = ref(false);

const toggleBotNotifications = () => {
  botNotifications.value = !botNotifications.value;
};

const toggleEmailNotifications = () => {
  emailNotifications.value = !emailNotifications.value;
};
</script>

<style scoped>
</style>
