<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  BoltIcon as BoltOutline,
  ArrowPathRoundedSquareIcon,
} from '@heroicons/vue/24/outline'
import { BoltIcon as BoltSolid } from '@heroicons/vue/24/solid'
import type { BarcodeResult } from '@/types'
import { useBarcodeScanner } from '@/composables/useBarcodeScanner'
import { useScannerStore } from '@/stores/scanner'
import { useHistoryStore } from '@/stores/history'
import { useToast } from '@/composables/useToast'
import { validateBarcode } from '@/services/api/barcodeValidation'
import { formatBarcode } from '@/utils/format'
import ScannerOverlay from '@/components/features/scanner/ScannerOverlay.vue'
import CameraPermission from '@/components/common/CameraPermission.vue'

type VerifyState = 'scanning' | 'checking' | 'valid' | 'invalid'

const scannerStore = useScannerStore()
const historyStore = useHistoryStore()
const toast = useToast()

const videoRef = ref<HTMLVideoElement | null>(null)
const verifyState = ref<VerifyState>('scanning')
const activeBarcode = ref('')
const resultMessage = ref('')

const { permission, start, pause, resume, toggleFlash, switchCamera } = useBarcodeScanner({
  onDetect: handleDetect,
})

const instruction = computed(() => {
  switch (verifyState.value) {
    case 'checking':
      return 'Validating barcode…'
    case 'valid':
      return resultMessage.value || 'Barcode valid'
    case 'invalid':
      return resultMessage.value || 'Barcode not recognized'
    default:
      return 'Align the barcode or QR code within the frame'
  }
})

async function handleDetect(result: BarcodeResult) {
  videoRef.value?.pause()
  pause()
  verifyState.value = 'checking'
  activeBarcode.value = result.text
  resultMessage.value = ''

  const outcome = await validateBarcode(result.text)

  if (outcome.valid) {
    verifyState.value = 'valid'
    resultMessage.value = outcome.message ?? ''
    historyStore.addEntry({ barcode: result.text, format: result.format, status: 'success' })
    toast.success(outcome.message ?? 'Barcode valid')
  } else {
    verifyState.value = 'invalid'
    resultMessage.value = outcome.message ?? ''
    historyStore.addEntry({
      barcode: result.text,
      format: result.format,
      status: 'failed',
      reason: outcome.message,
    })
    toast.error(outcome.message ?? 'Barcode not valid')
  }

  window.setTimeout(() => {
    verifyState.value = 'scanning'
    videoRef.value?.play().catch(() => undefined)
    resume()
  }, 1100)
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

      <ScannerOverlay :status="verifyState" :instruction="instruction" />

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

      <!-- Last scanned barcode strip -->
      <Transition name="fade">
        <div
          v-if="verifyState === 'valid' || verifyState === 'invalid'"
          class="absolute inset-x-6 top-16 z-10 rounded-2xl px-4 py-2.5 text-center shadow-soft"
          :class="verifyState === 'valid' ? 'bg-success/95' : 'bg-error/95'"
        >
          <p class="font-mono text-sm font-semibold text-white">
            {{ formatBarcode(activeBarcode) }}
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
