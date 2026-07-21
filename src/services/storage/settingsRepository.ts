import type { AppSettings } from '@/types'
import { readJSON, writeJSON } from './localStorage'

const STORAGE_KEY = 'scanly.settings.v1'

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  soundEnabled: true,
  vibrationEnabled: true,
  autoContinueScan: false,
  flashDefault: false,
}

export const settingsRepository = {
  load(): AppSettings {
    return readJSON<AppSettings>(STORAGE_KEY, DEFAULT_SETTINGS)
  },
  save(settings: AppSettings): void {
    writeJSON(STORAGE_KEY, settings)
  },
}
