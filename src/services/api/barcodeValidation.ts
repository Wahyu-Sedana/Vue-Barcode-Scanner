const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'https://staging-coco.srv700354.hstgr.cloud'
const VALIDATE_BARCODE_URL = `${API_BASE}/api/stamp-redeems/direct/validate-barcode`

export interface ValidateBarcodeResult {
  valid: boolean
  message?: string
  data?: unknown
}

function extractMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined
  const record = payload as Record<string, unknown>
  if (typeof record.message === 'string') return record.message
  if (typeof record.error === 'string') return record.error
  return undefined
}

/** Validates a scanned barcode against the redemption backend. */
export async function validateBarcode(barcodeCode: string): Promise<ValidateBarcodeResult> {
  try {
    const response = await fetch(VALIDATE_BARCODE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barcode_code: barcodeCode }),
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        valid: false,
        message: extractMessage(payload) ?? `Barcode validation failed (${response.status})`,
        data: payload,
      }
    }

    return { valid: true, message: extractMessage(payload), data: payload }
  } catch {
    return { valid: false, message: 'Could not reach validation server' }
  }
}
