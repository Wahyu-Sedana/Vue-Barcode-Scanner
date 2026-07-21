<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

withDefaults(
  defineProps<{
    title?: string
    showBack?: boolean
    transparent?: boolean
  }>(),
  {
    title: '',
    showBack: false,
    transparent: false,
  },
)

const emit = defineEmits<{ back: [] }>()
const router = useRouter()

function handleBack() {
  emit('back')
  router.back()
}
</script>

<template>
  <header
    class="safe-top sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 px-4"
    :class="transparent ? '' : 'glass border-b border-slate-100 dark:border-slate-800'"
  >
    <button
      v-if="showBack"
      type="button"
      aria-label="Go back"
      class="-ml-1.5 flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition active:scale-90 active:bg-slate-100 dark:text-slate-200 dark:active:bg-slate-800"
      @click="handleBack"
    >
      <ChevronLeftIcon class="h-6 w-6" />
    </button>
    <h1 class="flex-1 truncate text-[17px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
      {{ title }}
    </h1>
    <div class="flex items-center gap-1">
      <slot name="actions" />
    </div>
  </header>
</template>
