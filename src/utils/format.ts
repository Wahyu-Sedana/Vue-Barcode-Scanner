export function formatBarcode(barcode: string): string {
  if (barcode.length <= 4) return barcode
  const groups = barcode.match(/.{1,4}/g)
  return groups ? groups.join(' ') : barcode
}

const FORMAT_LABELS: Record<string, string> = {
  ean_13: 'EAN-13',
  ean_8: 'EAN-8',
  upc_a: 'UPC-A',
  upc_e: 'UPC-E',
  code_128: 'Code 128',
  code_39: 'Code 39',
  qr_code: 'QR Code',
}

export function formatBarcodeType(format: string): string {
  return FORMAT_LABELS[format] ?? format.toUpperCase()
}
