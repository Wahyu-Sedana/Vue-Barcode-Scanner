import { reactive } from 'vue'
import { generateId } from '@/utils/id'

export type ToastVariant = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
}

const toasts = reactive<Toast[]>([])

function dismiss(id: string) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

function push(message: string, variant: ToastVariant = 'info', duration = 2600) {
  const id = generateId('toast')
  toasts.push({ id, message, variant })
  window.setTimeout(() => dismiss(id), duration)
}

/** App-wide toast queue — singleton state shared by every caller. */
export function useToast() {
  return {
    toasts,
    success: (message: string) => push(message, 'success'),
    error: (message: string) => push(message, 'error'),
    info: (message: string) => push(message, 'info'),
    dismiss,
  }
}
