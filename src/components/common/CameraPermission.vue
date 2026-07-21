<script setup lang="ts">
import { CameraIcon } from '@heroicons/vue/24/solid'

withDefaults(defineProps<{ message?: string }>(), {
  message: 'Scanly needs camera access to scan barcodes. Enable it in your browser settings and try again.',
})

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-4 bg-slate-950 px-8 py-16 text-center text-white">
    <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
      <CameraIcon class="h-8 w-8" />
    </div>
    <div>
      <p class="text-[15px] font-semibold">Camera access needed</p>
      <p class="mt-1 text-sm text-white/60">{{ message }}</p>
    </div>
    <button
      type="button"
      class="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-float transition active:scale-95"
      @click="emit('retry')"
    >
      Enable Camera
    </button>
  </div>
</template>
