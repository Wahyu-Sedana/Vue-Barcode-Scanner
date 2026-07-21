export type BarcodeFormat =
  | 'ean_13'
  | 'ean_8'
  | 'upc_a'
  | 'upc_e'
  | 'code_128'
  | 'code_39'
  | 'qr_code'

export interface BarcodeResult {
  text: string
  format: BarcodeFormat | string
  timestamp: number
}

export type CameraFacing = 'environment' | 'user'

export type ScannerEngine = 'native' | 'zxing'

export interface BarcodeScannerOptions {
  /** Video element the scanner should render camera frames into. */
  videoElement: HTMLVideoElement
  facingMode?: CameraFacing
  onDetect: (result: BarcodeResult) => void
  onError?: (error: Error) => void
}

/**
 * Abstraction over the underlying scanning engine so the rest of the app
 * never needs to know whether it's running the native Barcode Detection API
 * or the ZXing fallback.
 */
export interface BarcodeScanner {
  readonly engine: ScannerEngine
  start(options: BarcodeScannerOptions): Promise<void>
  stop(): Promise<void>
  pause(): void
  resume(): void
  toggleFlash(): Promise<boolean>
  switchCamera(): Promise<CameraFacing>
  readonly isFlashOn: boolean
  readonly currentFacing: CameraFacing
}
