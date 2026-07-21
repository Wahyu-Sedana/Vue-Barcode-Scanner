import { onBeforeUnmount, shallowRef } from 'vue'
import type { BarcodeResult } from '@/types'
import { createBarcodeScanner, type BarcodeScanner } from '@/services/barcode'
import { playBeep } from '@/services/audio/beep'
import { vibrate } from '@/services/haptics/vibrate'
import { useScannerStore } from '@/stores/scanner'
import { useSettingStore } from '@/stores/settings'

export type CameraPermissionState = 'idle' | 'granted' | 'denied'

interface UseBarcodeScannerOptions {
  onDetect: (result: BarcodeResult) => void
}

/**
 * Owns the active BarcodeScanner engine instance and bridges it to the
 * scanner Pinia store + user feedback (sound/vibration), so views only
 * need a <video> element ref and a detection callback.
 */
export function useBarcodeScanner(options: UseBarcodeScannerOptions) {
  const scannerStore = useScannerStore()
  const settings = useSettingStore()

  const permission = shallowRef<CameraPermissionState>('idle')
  let engine: BarcodeScanner | null = null

  async function start(videoElement: HTMLVideoElement) {
    scannerStore.setStatus('requesting')
    try {
      engine = await createBarcodeScanner()
      scannerStore.setEngine(engine.engine)
      await engine.start({
        videoElement,
        facingMode: scannerStore.facing,
        onDetect: handleDetect,
        onError: (error) => scannerStore.setError(error.message),
      })
      if (settings.flashDefault) {
        await toggleFlash()
      }
      permission.value = 'granted'
      scannerStore.setStatus('scanning')
    } catch (error) {
      permission.value = 'denied'
      scannerStore.setError(error instanceof Error ? error.message : 'Unable to access camera')
    }
  }

  function handleDetect(result: BarcodeResult) {
    if (settings.soundEnabled) playBeep('success')
    if (settings.vibrationEnabled) vibrate(60)
    scannerStore.setResult(result)
    options.onDetect(result)
  }

  async function stop() {
    await engine?.stop()
    engine = null
    scannerStore.reset()
  }

  function pause() {
    engine?.pause()
  }

  function resume() {
    engine?.resume()
    scannerStore.setStatus('scanning')
  }

  async function toggleFlash() {
    if (!engine) return
    const isOn = await engine.toggleFlash()
    scannerStore.setFlash(isOn)
  }

  async function switchCamera() {
    if (!engine) return
    const facing = await engine.switchCamera()
    scannerStore.setFacing(facing)
  }

  onBeforeUnmount(() => {
    void stop()
  })

  return {
    permission,
    start,
    stop,
    pause,
    resume,
    toggleFlash,
    switchCamera,
  }
}
