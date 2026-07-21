<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

withDefaults(
  defineProps<{
    label: string
    value: string | number
    icon: FunctionalComponent
    tone?: 'primary' | 'success' | 'error'
  }>(),
  { tone: 'primary' },
)

const toneClasses: Record<string, string> = {
  primary: 'bg-primary-50 text-primary dark:bg-primary-900/30 dark:text-primary-300',
  success: 'bg-success-50 text-success dark:bg-success/10 dark:text-success',
  error: 'bg-error-50 text-error dark:bg-error/10 dark:text-error',
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
    <div class="flex h-9 w-9 items-center justify-center rounded-xl" :class="toneClasses[tone]">
      <component :is="icon" class="h-5 w-5" />
    </div>
    <div>
      <p class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{{ value }}</p>
      <p class="text-xs font-medium text-slate-400 dark:text-slate-500">{{ label }}</p>
    </div>
  </div>
</template>
