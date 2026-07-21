<script setup lang="ts">
import ScannerLaser from './ScannerLaser.vue'

withDefaults(
  defineProps<{
    status?: 'scanning' | 'detected' | 'idle'
    instruction?: string
  }>(),
  {
    status: 'scanning',
    instruction: 'Align the barcode or QR code within the frame',
  },
)
</script>

<template>
  <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
    <div
      class="relative h-64 w-64 rounded-[32px] transition-shadow duration-300"
      style="box-shadow: 0 0 0 9999px rgba(2, 6, 23, 0.6)"
    >
      <!-- Corner brackets -->
      <span class="absolute -left-0.5 -top-0.5 h-9 w-9 rounded-tl-2xl border-l-4 border-t-4 border-white/90" />
      <span class="absolute -right-0.5 -top-0.5 h-9 w-9 rounded-tr-2xl border-r-4 border-t-4 border-white/90" />
      <span class="absolute -bottom-0.5 -left-0.5 h-9 w-9 rounded-bl-2xl border-b-4 border-l-4 border-white/90" />
      <span class="absolute -bottom-0.5 -right-0.5 h-9 w-9 rounded-br-2xl border-b-4 border-r-4 border-white/90" />

      <ScannerLaser :active="status === 'scanning'" />

      <Transition name="scale">
        <div
          v-if="status === 'detected'"
          class="absolute inset-0 flex items-center justify-center rounded-[32px] ring-4 ring-success"
        >
          <span class="absolute inset-0 rounded-[32px] bg-success/10" />
        </div>
      </Transition>
    </div>

    <p class="mt-7 max-w-[240px] text-center text-sm font-medium text-white/85">
      {{ instruction }}
    </p>
  </div>
</template>
