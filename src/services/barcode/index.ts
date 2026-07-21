import type { BarcodeScanner } from '@/types'
import { NativeBarcodeScanner } from './NativeBarcodeScanner'
import { ZXingBarcodeScanner } from './ZXingBarcodeScanner'

export type { BarcodeScanner } from '@/types'

/**
 * Auto-detects browser support for the native Barcode Detection API and
 * falls back to the ZXing WASM/JS decoder when unavailable.
 */
export async function createBarcodeScanner(): Promise<BarcodeScanner> {
  const nativeSupported = await NativeBarcodeScanner.isSupported()
  return nativeSupported ? new NativeBarcodeScanner() : new ZXingBarcodeScanner()
}
