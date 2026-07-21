import type {
  BarcodeScanner,
  BarcodeScannerOptions,
  CameraFacing,
  ScannerEngine,
} from '@/types'
import { CameraController } from './CameraController'

const SUPPORTED_FORMATS = [
  'ean_13',
  'ean_8',
  'upc_a',
  'upc_e',
  'code_128',
  'code_39',
  'qr_code',
]

/**
 * Uses the browser-native Barcode Detection API. Runs a requestAnimationFrame
 * loop that feeds video frames into `BarcodeDetector.detect()`.
 */
export class NativeBarcodeScanner implements BarcodeScanner {
  readonly engine: ScannerEngine = 'native'

  private camera = new CameraController()
  private detector: BarcodeDetector | null = null
  private rafId: number | null = null
  private paused = false
  private options: BarcodeScannerOptions | null = null
  private lastDetectedAt = 0

  static async isSupported(): Promise<boolean> {
    if (typeof window === 'undefined' || !window.BarcodeDetector) return false
    try {
      const formats = await window.BarcodeDetector.getSupportedFormats()
      return SUPPORTED_FORMATS.some((format) => formats.includes(format))
    } catch {
      return false
    }
  }

  get isFlashOn(): boolean {
    return this.camera.isFlashOn
  }

  get currentFacing(): CameraFacing {
    return this.camera.currentFacing
  }

  async start(options: BarcodeScannerOptions): Promise<void> {
    this.options = options
    this.detector = new window.BarcodeDetector!({ formats: SUPPORTED_FORMATS })
    await this.camera.attach(options.videoElement, options.facingMode ?? 'environment')
    this.paused = false
    this.loop()
  }

  private loop = (): void => {
    this.rafId = requestAnimationFrame(this.loop)
    if (this.paused || !this.detector || !this.options) return

    const video = this.options.videoElement
    if (video.readyState < video.HAVE_ENOUGH_DATA) return

    this.detector
      .detect(video)
      .then((barcodes) => {
        const now = performance.now()
        if (barcodes.length > 0 && now - this.lastDetectedAt > 800) {
          this.lastDetectedAt = now
          const barcode = barcodes[0]!
          this.options?.onDetect({
            text: barcode.rawValue,
            format: barcode.format,
            timestamp: Date.now(),
          })
        }
      })
      .catch((error: Error) => this.options?.onError?.(error))
  }

  async stop(): Promise<void> {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.rafId = null
    this.camera.detach()
    this.detector = null
    this.options = null
  }

  pause(): void {
    this.paused = true
  }

  resume(): void {
    this.paused = false
  }

  async toggleFlash(): Promise<boolean> {
    return this.camera.toggleFlash()
  }

  async switchCamera(): Promise<CameraFacing> {
    return this.camera.switchFacing()
  }
}
