import { defineStore } from 'pinia'
import type { BarcodeResult, CameraFacing, ScannerEngine } from '@/types'

export type ScanStatus = 'idle' | 'requesting' | 'scanning' | 'detected' | 'error'

interface ScannerState {
  status: ScanStatus
  engine: ScannerEngine | null
  facing: CameraFacing
  flashOn: boolean
  lastResult: BarcodeResult | null
  errorMessage: string | null
}

export const useScannerStore = defineStore('scanner', {
  state: (): ScannerState => ({
    status: 'idle',
    engine: null,
    facing: 'environment',
    flashOn: false,
    lastResult: null,
    errorMessage: null,
  }),

  getters: {
    isScanning(state): boolean {
      return state.status === 'scanning'
    },
  },

  actions: {
    setStatus(status: ScanStatus) {
      this.status = status
      if (status !== 'error') this.errorMessage = null
    },
    setEngine(engine: ScannerEngine) {
      this.engine = engine
    },
    setFacing(facing: CameraFacing) {
      this.facing = facing
    },
    setFlash(flashOn: boolean) {
      this.flashOn = flashOn
    },
    setResult(result: BarcodeResult) {
      this.lastResult = result
      this.status = 'detected'
    },
    setError(message: string) {
      this.status = 'error'
      this.errorMessage = message
    },
    reset() {
      this.status = 'idle'
      this.lastResult = null
      this.errorMessage = null
    },
  },
})
