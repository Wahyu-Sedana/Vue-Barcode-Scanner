<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ViewfinderCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

onMounted(() => {
  window.setTimeout(() => {
    router.replace({ name: 'scanner' })
  }, 1600)
})
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center bg-primary">
    <div class="flex flex-col items-center gap-5 animate-fade-in">
      <div class="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/15 shadow-float">
        <ViewfinderCircleIcon class="h-11 w-11 text-white" />
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold tracking-tight text-white">Scanly</p>
        <p class="mt-1 text-sm font-medium text-white/70">Product Barcode Scanner</p>
      </div>
    </div>

    <div class="absolute bottom-16 flex items-center gap-1.5">
      <span class="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.3s]" />
      <span class="h-2 w-2 animate-bounce rounded-full bg-white/80 [animation-delay:-0.15s]" />
      <span class="h-2 w-2 animate-bounce rounded-full bg-white/80" />
    </div>
  </div>
</template>
