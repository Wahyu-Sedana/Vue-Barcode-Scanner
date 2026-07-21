import { BrowserMultiFormatReader } from '@zxing/browser'
import { BarcodeFormat, DecodeHintType } from '@zxing/library'
import type { IScannerControls } from '@zxing/browser'
import type { Result, Exception } from '@zxing/library'
import type {
  BarcodeScanner,
  BarcodeScannerOptions,
  CameraFacing,
  ScannerEngine,
} from '@/types'
import { CameraController } from './CameraController'

const FORMAT_MAP: Record<number, string> = {
  [BarcodeFormat.EAN_13]: 'ean_13',
  [BarcodeFormat.EAN_8]: 'ean_8',
  [BarcodeFormat.UPC_A]: 'upc_a',
  [BarcodeFormat.UPC_E]: 'upc_e',
  [BarcodeFormat.CODE_128]: 'code_128',
  [BarcodeFormat.CODE_39]: 'code_39',
  [BarcodeFormat.QR_CODE]: 'qr_code',
}

function buildReader(): BrowserMultiFormatReader {
  const hints = new Map<DecodeHintType, unknown>()
  hints.set(DecodeHintType.POSSIBLE_FORMATS, Object.keys(FORMAT_MAP).map(Number))
  hints.set(DecodeHintType.TRY_HARDER, true)
  return new BrowserMultiFormatReader(hints, { delayBetweenScanAttempts: 150 })
}

/**
 * Fallback engine for browsers without the native Barcode Detection API
 * (Firefox, Safari < 17, most desktop browsers). Reuses CameraController so
 * flash/camera-switch behave identically to the native engine.
 */
export class ZXingBarcodeScanner implements BarcodeScanner {
  readonly engine: ScannerEngine = 'zxing'

  private camera = new CameraController()
  private reader = buildReader()
  private controls: IScannerControls | null = null
  private options: BarcodeScannerOptions | null = null
  private paused = false
  private lastDetectedAt = 0

  get isFlashOn(): boolean {
    return this.camera.isFlashOn
  }

  get currentFacing(): CameraFacing {
    return this.camera.currentFacing
  }

  async start(options: BarcodeScannerOptions): Promise<void> {
    this.options = options
    const stream = await this.camera.attach(options.videoElement, options.facingMode ?? 'environment')
    this.controls = await this.reader.decodeFromStream(stream, options.videoElement, this.handleResult)
  }

  private handleResult = (result: Result | undefined, error: Exception | undefined): void => {
    if (this.paused) return
    if (result) {
      const now = performance.now()
      if (now - this.lastDetectedAt < 800) return
      this.lastDetectedAt = now
      this.options?.onDetect({
        text: result.getText(),
        format: FORMAT_MAP[result.getBarcodeFormat()] ?? 'unknown',
        timestamp: Date.now(),
      })
      return
    }
    if (error && error.name !== 'NotFoundException') {
      this.options?.onError?.(error as unknown as Error)
    }
  }

  async stop(): Promise<void> {
    this.controls?.stop()
    this.controls = null
    this.camera.detach()
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
    this.controls?.stop()
    const facing = await this.camera.switchFacing()
    const stream = this.camera.activeStream
    if (this.options && stream) {
      this.controls = await this.reader.decodeFromStream(stream, this.options.videoElement, this.handleResult)
    }
    return facing
  }
}
