<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  BoltIcon as BoltOutline,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/vue/24/outline'
import { BoltIcon as BoltSolid } from '@heroicons/vue/24/solid'
import type { BarcodeResult } from '@/types'
import { useBarcodeScanner } from '@/composables/useBarcodeScanner'
import { useScannerStore } from '@/stores/scanner'
import { useHistoryStore } from '@/stores/history'
import { formatBarcode } from '@/utils/format'
import ScannerOverlay from '@/components/features/scanner/ScannerOverlay.vue'
import CameraPermission from '@/components/common/CameraPermission.vue'

const scannerStore = useScannerStore()
const historyStore = useHistoryStore()

const videoRef = ref<HTMLVideoElement | null>(null)

const { permission, start, toggleFlash, switchCamera } = useBarcodeScanner({
  onDetect: handleDetect,
})

function handleDetect(result: BarcodeResult) {
  historyStore.addEntry({
    barcode: result.text,
    format: result.format,
    status: 'success',
  })
  // Brief green "detected" pulse, then back to live scanning — camera never pauses.
  window.setTimeout(() => {
    if (scannerStore.status === 'detected') scannerStore.setStatus('scanning')
  }, 700)
}

async function launchCamera() {
  historyStore.load()
  if (videoRef.value) {
    await start(videoRef.value)
  }
}

onMounted(launchCamera)
</script>

<template>
  <div class="relative flex flex-1 flex-col bg-slate-950">
    <CameraPermission v-if="permission === 'denied'" @retry="launchCamera" />

    <template v-else>
      <video ref="videoRef" class="absolute inset-0 h-full w-full object-cover" muted playsinline autoplay />

      <ScannerOverlay :status="scannerStore.status === 'detected' ? 'detected' : 'scanning'" />

      <!-- Top bar -->
      <div class="safe-top relative z-10 flex items-center justify-between px-4 pt-3">
        <div class="h-10 w-10" aria-hidden="true" />
        <p class="text-[15px] font-semibold text-white">Scan Barcode</p>
        <button
          type="button"
          aria-label="Toggle flash"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition active:scale-90"
          @click="toggleFlash"
        >
          <component :is="scannerStore.flashOn ? BoltSolid : BoltOutline" class="h-5 w-5" />
        </button>
      </div>

      <!-- Last scanned toast strip -->
      <Transition name="fade">
        <div
          v-if="scannerStore.status === 'detected' && scannerStore.lastResult"
          class="absolute inset-x-6 top-16 z-10 rounded-2xl bg-success/95 px-4 py-2.5 text-center shadow-soft"
        >
          <p class="font-mono text-sm font-semibold text-white">
            {{ formatBarcode(scannerStore.lastResult.text) }}
          </p>
        </div>
      </Transition>

      <!-- Bottom controls -->
      <div class="safe-bottom relative z-10 mt-auto flex flex-col items-center gap-4 pb-8">
        <div class="flex flex-wrap justify-center gap-1.5 px-8">
          <span
            v-for="format in ['EAN-13', 'EAN-8', 'UPC-A', 'UPC-E', 'Code128', 'Code39', 'QR']"
            :key="format"
            class="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/70"
          >
            {{ format }}
          </span>
        </div>

        <button
          type="button"
          aria-label="Switch camera"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition active:scale-90"
          @click="switchCamera"
        >
          <ArrowPathRoundedSquareIcon class="h-6 w-6" />
        </button>
      </div>
    </template>
  </div>
</template>
