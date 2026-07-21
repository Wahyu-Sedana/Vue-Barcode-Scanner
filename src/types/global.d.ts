export {}

declare global {
  interface BarcodeDetectorOptions {
    formats: string[]
  }

  interface DetectedBarcode {
    boundingBox: DOMRectReadOnly
    rawValue: string
    format: string
    cornerPoints: { x: number; y: number }[]
  }

  class BarcodeDetector {
    constructor(options?: BarcodeDetectorOptions)
    static getSupportedFormats(): Promise<string[]>
    detect(source: CanvasImageSource): Promise<DetectedBarcode[]>
  }

  interface Window {
    BarcodeDetector?: typeof BarcodeDetector
  }
}
