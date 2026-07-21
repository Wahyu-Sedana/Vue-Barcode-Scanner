<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

withDefaults(
  defineProps<{
    title?: string
    message?: string
    retryLabel?: string
  }>(),
  {
    title: 'Something went wrong',
    message: 'Please try again in a moment.',
    retryLabel: 'Try Again',
  },
)

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center animate-fade-in">
    <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-error-50 text-error dark:bg-error/10">
      <ExclamationTriangleIcon class="h-8 w-8" />
    </div>
    <div>
      <p class="text-[15px] font-semibold text-slate-900 dark:text-slate-50">{{ title }}</p>
      <p class="mt-1 text-sm text-slate-400 dark:text-slate-500">{{ message }}</p>
    </div>
    <button
      type="button"
      class="rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-float transition active:scale-95"
      @click="emit('retry')"
    >
      {{ retryLabel }}
    </button>
  </div>
</template>
