<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <!-- Header with back button -->
    <div class="flex items-center pt-30 pl-4">
      <NuxtLink to="/" class="text-gray-400">
        <Icon name="mingcute:left-line" size="24" class="text-[#6B89E1]" />
      </NuxtLink>
      <div class="w-6"></div>
    </div>

    <!-- Profile section -->
    <div class="pt-4 pl-4">
      <div class="flex items-center gap-4 mb-6">
        <div class="bg-[#D9D9D9] h-16 w-16 rounded-full flex-shrink-0"></div>
        <div>
          <div class="rb-semibold" style="font-size: 17px;">Имя</div>
          <div class="rb-light text-gray-500 mt-1" style="font-size: 13px;">Адрес: Северская, ул. Примерная, д. 1, кв. 25</div>
          <div class="rb-light text-gray-500" style="font-size: 13px;">Лицевой счет: 1533456</div>
        </div>
      </div>
    </div>

    <!-- Ваши данные section -->
    <div class="px-4 mb-3">
        <div class="p-5 rounded-4xl bg-white drop-shadow-lg">
            <div class="ml-2">
                <span class="rb-medium" style="font-size: 17px;">Ваши данные</span>
            </div>
            <div class="grid gap-2 mt-4 ml-2">
                <NuxtLink to="/profile/phone" class="flex justify-between cursor-pointer hover:opacity-70 transition-opacity">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Телефон</span>
                        <span class="rb-light text-[#3A3A3A]/50" style="font-size: 11px;">+7 918 090 52 36</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </NuxtLink>
                <NuxtLink to="/profile/email" class="flex justify-between cursor-pointer hover:opacity-70 transition-opacity">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Почта</span>
                        <span class="rb-light text-[#3A3A3A]/50" style="font-size: 11px;">example@mail.com</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </NuxtLink>
                <NuxtLink to="/profile/street" class="flex mt-1 justify-between items-center cursor-pointer hover:opacity-70 transition-opacity">
                    <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Сменить адрес</span>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400" />
                </NuxtLink>
            </div>
        </div>
    </div>

    <!-- Приложение section -->
    <div class="px-4 mb-3">
        <div class="p-5 rounded-4xl bg-white drop-shadow-lg">
            <div class="ml-2">
                <span class="rb-medium" style="font-size: 17px;">Приложение</span>
            </div>
            <div class="grid mt-4 ml-2">
                <NuxtLink to="/profile/notifications" class="flex justify-between cursor-pointer hover:opacity-70 transition-opacity">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Уведомления</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </NuxtLink>
                <div class="flex justify-between">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Сайт</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </div>
            </div>
        </div>
    </div>

    <!-- Дополнительно section -->
    <div class="px-4 mb-3">
        <div class="p-5 rounded-4xl bg-white drop-shadow-lg">
            <div class="ml-2">
                <span class="rb-medium" style="font-size: 17px;">Дополнительно</span>
            </div>
            <div class="grid mt-4 ml-2">
                <div class="flex justify-between">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">База знаний</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </div>
                <div class="flex justify-between">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Сформировать обращение</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </div>
                <div class="flex justify-between">
                    <div class="grid">
                        <span class="rb-light text-[#3A3A3A]" style="font-size: 13px;">Лицензия и условия</span>
                    </div>
                    <Icon name="mingcute:right-line" size="16" class="text-gray-400 mt-3" />
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="flex-1"></div>
    <div class="flex gap-2 p-4 text-center text-gray-400 text-xs mb-1 justify-center">
      <img src="/scid.png" class="w-11 h-5" alt=""> version 0.7.8
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped>
</style>
