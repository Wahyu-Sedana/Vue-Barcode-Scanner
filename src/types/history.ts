import type { BarcodeFormat } from './barcode'

export type ScanStatus = 'success' | 'failed'

export interface HistoryEntry {
  id: string
  barcode: string
  format: BarcodeFormat | string
  status: ScanStatus
  reason?: string
  timestamp: number
}
