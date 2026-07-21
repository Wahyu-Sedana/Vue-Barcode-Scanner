<script setup lang="ts">
withDefaults(defineProps<{ message?: string }>(), { message: 'Loading…' })
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-3 py-16">
    <div class="h-9 w-9 animate-spin rounded-full border-[3px] border-primary-100 border-t-primary dark:border-slate-800 dark:border-t-primary" />
    <p class="text-sm font-medium text-slate-400 dark:text-slate-500">{{ message }}</p>
  </div>
</template>
