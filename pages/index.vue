<template>
  <div class="bg-white w-full min-h-screen flex flex-col">
    <div class="flex-1 flex flex-col w-full max-md:scale-[0.95] max-md:origin-top transition-transform duration-300">
      <ProfileHeader />
      <div class="full-content flex-1 flex flex-col overflow-hidden">
      <div class="bank">
      <div class="p-4">
        <div class="w-full rounded-4xl bg-white drop-shadow-lg">
          <div class="flex p-4">
            <div class="bg-[#6B89E1] h-11 w-11 rounded-full flex justify-center items-center">
              <div class="text-white font-semibold text-xl">₽</div>
            </div>
            <div class="grid pl-4 gap-5">
              <div class="grid">
                <div class="rb-semibold" style="font-size: 17px;">4300 ₽</div>
                <div class="rb-light" style="font-size: 15px;">Баланс помещения</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ratepokaz flex gap-7 p-4">
      <div class="w-[50%] grid justify-between rounded-4xl p-5 bg-white drop-shadow-lg">
        <div class="grid">
          <div class="rb-medium" style="font-size: 17px;">Ваш рейтинг</div>
          <div class="rb-light mb-7" style="font-size: 13px;">Рейтинг в 25 г</div>
        </div>
        <div class="content-end">
          <div class="flex gap-[3px] text-xl">
            <Icon name="mingcute:star-fill" style="color: #FEDE27;" size="19" />
            <Icon name="mingcute:star-fill" style="color: #FEDE27;" size="19" />
            <Icon name="mingcute:star-fill" style="color: #FEDE27;" size="19" />
            <Icon name="mingcute:star-fill" style="color: #D9D9D9;" size="19" />
            <Icon name="mingcute:star-fill" style="color: #D9D9D9;" size="19" />
            <Icon name="mingcute:star-fill" style="color: #D9D9D9;" size="19" />
          </div>
        </div>
      </div>
      <NuxtLink to="/readings-step1" class="grid w-[50%] gap-1 p-5 rounded-4xl bg-white drop-shadow-lg cursor-pointer">
        <div class="flex text-xl">
          <div class="tracking-tighter rb-medium" style="font-size: 15px; line-height: 22px;">Подача показаний</div>
          <div class="text-2xl pl-2"><Icon name="mingcute:camera-2-line" /></div>
        </div>
        <div class="text-black rb-light" style="font-size: 12px; line-height: 22px;">
          Подача показаний <br> через камеру
        </div>
      </NuxtLink>
    </div>
    <div class="popolnenie flex p-4 gap-3">
      <NuxtLink to="/quick-topup" class="grid gap-1 w-[25%]">
        <div class="bg-[#EEEEEE] rounded-2xl  flex justify-center p-4">
          <div class="rounded-full h-5 w-5 bg-linear-to-br from-[#6B89E1] to-[#9DB6FF] flex justify-center pt-[2px]">
            <Icon name="mingcute:add-fill" class="text-white" />
          </div>
        </div>
        <div class="text-xs rb-light text-center" style="font-size: 10px;">Пополнить лицевой счет</div>
      </NuxtLink>
      <NuxtLink to="/quick-topup" class="grid gap-1 w-[25%]">
        <div class="bg-[#FFDD2D] rounded-2xl  flex justify-center p-4">
          <div><img src="/Vector.png" alt=""></div>
        </div>
        <div class="text-xs rb-light text-center" style="font-size: 10px;">Быстрое пополнение</div>
      </NuxtLink>
      <NuxtLink to="/quick-topup" class="grid gap-1 w-[25%]">
          <div class="bg-[#EEEEEE] rounded-2xl">
            <div class="rounded-2xl flex justify-center p-4">
              <img src="/sbericon.png" class="w-5 h-5 scale-[120%]" alt="">
            </div>
          </div>
          <div class="text-xs rb-light text-center pt-1" style="font-size: 10px;">Быстрое пополнение</div>
      </NuxtLink>
      <NuxtLink to="/quick-topup" class="grid gap-1 w-[25%]">
        <div class="bg-[#EEEEEE] rounded-2xl  flex justify-center p-4">
            <div><img src="/alpha.png" class="h-5" alt=""></div>
        </div>
        <div class="text-xs rb-light text-center" style="font-size: 10px;">Быстрое пополнение</div>
      </NuxtLink>
    </div>
    <div class="news grow bg-[#F6F6FF] rounded-4xl mx-4 mb-21 flex flex-col items-center justify-end pb-5 relative"
         @touchstart="handleTouchStart"
         @touchend="handleTouchEnd">
      <!-- Indicators (Dots) -->
      <div class="flex gap-2">
        <div
          v-for="index in 3"
          :key="index"
          :class="[
            'w-2 h-2 rounded-full transition-colors duration-300',
            currentNews === index - 1 ? 'bg-[#FFFFFF]' : 'bg-[#D9D9D9]'
          ]"
        ></div>
      </div>
    </div>
    </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
const currentNews = ref(0);
let touchStartX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe left - next news
      currentNews.value = (currentNews.value + 1) % 3;
    } else {
      // Swipe right - previous news
      currentNews.value = (currentNews.value - 1 + 3) % 3;
    }
  }
};
</script>

<style>
</style>