import { defineStore } from 'pinia'
import type { AppSettings, ThemeMode } from '@/types'
import { settingsRepository } from '@/services/storage/settingsRepository'

export const useSettingStore = defineStore('settings', {
  state: (): AppSettings => settingsRepository.load(),
  actions: {
    setTheme(theme: ThemeMode) {
      this.theme = theme
      this.persist()
    },
    toggleSound(value: boolean) {
      this.soundEnabled = value
      this.persist()
    },
    toggleVibration(value: boolean) {
      this.vibrationEnabled = value
      this.persist()
    },
    toggleAutoContinue(value: boolean) {
      this.autoContinueScan = value
      this.persist()
    },
    toggleFlashDefault(value: boolean) {
      this.flashDefault = value
      this.persist()
    },
    persist() {
      settingsRepository.save({
        theme: this.theme,
        soundEnabled: this.soundEnabled,
        vibrationEnabled: this.vibrationEnabled,
        autoContinueScan: this.autoContinueScan,
        flashDefault: this.flashDefault,
      })
    },
  },
})
