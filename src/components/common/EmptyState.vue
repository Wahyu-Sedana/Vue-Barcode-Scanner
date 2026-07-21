<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

withDefaults(
  defineProps<{
    icon: FunctionalComponent
    title: string
    description?: string
  }>(),
  { description: '' },
)
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-16 text-center animate-fade-in">
    <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary dark:bg-slate-800 dark:text-primary-300">
      <component :is="icon" class="h-8 w-8" />
    </div>
    <div>
      <p class="text-[15px] font-semibold text-slate-900 dark:text-slate-50">{{ title }}</p>
      <p v-if="description" class="mt-1 text-sm text-slate-400 dark:text-slate-500">{{ description }}</p>
    </div>
    <slot name="action" />
  </div>
</template>
