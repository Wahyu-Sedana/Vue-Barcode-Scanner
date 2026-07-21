<script setup lang="ts">
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid'
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const icons = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
}

const tones: Record<string, string> = {
  success: 'text-success',
  error: 'text-error',
  info: 'text-primary',
}
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed inset-x-0 top-0 z-[60] mx-auto flex max-w-[430px] flex-col items-center gap-2 px-4 pt-[calc(env(safe-area-inset-top)+12px)]">
      <TransitionGroup name="scale">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="glass pointer-events-auto flex w-full items-center gap-2.5 rounded-2xl px-4 py-3 shadow-soft ring-1 ring-slate-100 dark:ring-slate-800"
          @click="dismiss(toast.id)"
        >
          <component :is="icons[toast.variant]" class="h-5 w-5 shrink-0" :class="tones[toast.variant]" />
          <p class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ toast.message }}</p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
