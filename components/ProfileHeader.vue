<template>
  <NuxtLink to="/profile" class="profile p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
    <div class="bg-[#D9D9D9] h-11 w-11 rounded-full flex-shrink-0"></div>
    
    <div class="pl-4">
      <div class="subpixel-antialiased rb-semibold font-bold flex items-center gap-1" style="font-size: 17px;">
        Имя <Icon name="mingcute:right-line" size="14" />
      </div>
      <div class="subpixel-antialiased rb-light text-gray-500 leading-tight mt-1" style="font-size: 13px;">
        Адрес: Северская, ул. Примерная, д. 1, кв. 25
      </div>
    </div>
  </NuxtLink>
</template>