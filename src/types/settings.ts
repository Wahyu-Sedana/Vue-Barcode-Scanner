export type ThemeMode = 'light' | 'dark' | 'system'

export interface AppSettings {
  theme: ThemeMode
  soundEnabled: boolean
  vibrationEnabled: boolean
  autoContinueScan: boolean
  flashDefault: boolean
}
