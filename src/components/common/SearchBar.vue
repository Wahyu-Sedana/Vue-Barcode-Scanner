<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const model = defineModel<string>({ default: '' })

withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'Search barcode…',
})
</script>

<template>
  <div
    class="flex h-11 items-center gap-2 rounded-2xl bg-secondary px-3.5 text-slate-500 transition focus-within:ring-2 focus-within:ring-primary/40 dark:bg-slate-800/70 dark:text-slate-400"
  >
    <MagnifyingGlassIcon class="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500" />
    <input
      v-model="model"
      type="search"
      :placeholder="placeholder"
      class="h-full w-full bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
    />
    <button
      v-if="model"
      type="button"
      aria-label="Clear search"
      class="shrink-0 text-slate-400 transition active:scale-90"
      @click="model = ''"
    >
      <XCircleIcon class="h-5 w-5" />
    </button>
  </div>
</template>
