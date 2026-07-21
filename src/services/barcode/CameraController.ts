import type { CameraFacing } from '@/types'

/**
 * Owns the raw MediaStream lifecycle so both scanning engines (native +
 * ZXing) can share identical camera switching / torch behaviour instead of
 * re-implementing getUserMedia plumbing twice.
 */
export class CameraController {
  private stream: MediaStream | null = null
  private videoElement: HTMLVideoElement | null = null
  private facing: CameraFacing = 'environment'
  private flashOn = false

  get currentFacing(): CameraFacing {
    return this.facing
  }

  get isFlashOn(): boolean {
    return this.flashOn
  }

  get activeStream(): MediaStream | null {
    return this.stream
  }

  async attach(videoElement: HTMLVideoElement, facing: CameraFacing = 'environment'): Promise<MediaStream> {
    this.videoElement = videoElement
    this.facing = facing
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: facing },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    })
    this.stream = stream
    videoElement.srcObject = stream
    await videoElement.play().catch(() => undefined)
    return stream
  }

  async switchFacing(): Promise<CameraFacing> {
    const next: CameraFacing = this.facing === 'environment' ? 'user' : 'environment'
    this.detach()
    if (this.videoElement) {
      await this.attach(this.videoElement, next)
    }
    return next
  }

  async toggleFlash(): Promise<boolean> {
    const track = this.stream?.getVideoTracks()[0]
    if (!track) return false
    const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean }
    if (!capabilities?.torch) return false
    this.flashOn = !this.flashOn
    await track.applyConstraints({ advanced: [{ torch: this.flashOn } as unknown as MediaTrackConstraintSet] })
    return this.flashOn
  }

  detach(): void {
    this.stream?.getTracks().forEach((track) => track.stop())
    this.stream = null
    this.flashOn = false
    if (this.videoElement) {
      this.videoElement.srcObject = null
    }
  }
}
