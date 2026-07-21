<script setup lang="ts">
import { computed } from 'vue'
import ScannerLaser from './ScannerLaser.vue'

const props = withDefaults(
  defineProps<{
    status?: 'scanning' | 'checking' | 'valid' | 'invalid'
    instruction?: string
  }>(),
  {
    status: 'scanning',
    instruction: 'Align the barcode or QR code within the frame',
  },
)

const toneClasses = computed(() => {
  switch (props.status) {
    case 'valid':
      return 'ring-success bg-success/10'
    case 'invalid':
      return 'ring-error bg-error/10'
    case 'checking':
      return 'ring-primary bg-primary/10 animate-pulse'
    default:
      return ''
  }
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
    <div
      class="relative h-44 w-80 rounded-[28px] transition-shadow duration-300"
      style="box-shadow: 0 0 0 9999px rgba(2, 6, 23, 0.6)"
    >
      <!-- Corner brackets -->
      <span class="absolute -left-0.5 -top-0.5 h-8 w-8 rounded-tl-2xl border-l-4 border-t-4 border-white/90" />
      <span class="absolute -right-0.5 -top-0.5 h-8 w-8 rounded-tr-2xl border-r-4 border-t-4 border-white/90" />
      <span class="absolute -bottom-0.5 -left-0.5 h-8 w-8 rounded-bl-2xl border-b-4 border-l-4 border-white/90" />
      <span class="absolute -bottom-0.5 -right-0.5 h-8 w-8 rounded-br-2xl border-b-4 border-r-4 border-white/90" />

      <ScannerLaser :active="status === 'scanning'" />

      <Transition name="scale">
        <div v-if="status !== 'scanning'" class="absolute inset-0 rounded-[32px] ring-4" :class="toneClasses" />
      </Transition>
    </div>

    <p class="mt-7 max-w-[240px] text-center text-sm font-medium text-white/85">
      {{ instruction }}
    </p>
  </div>
</template>
