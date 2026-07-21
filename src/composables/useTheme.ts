import { watchEffect, onBeforeUnmount } from 'vue'
import { useSettingStore } from '@/stores/settings'

/** Applies the `.dark` class to <html> based on the settings store, following system preference in 'system' mode. */
export function useTheme() {
  const settings = useSettingStore()
  const media = window.matchMedia('(prefers-color-scheme: dark)')

  function apply() {
    const isDark = settings.theme === 'dark' || (settings.theme === 'system' && media.matches)
    document.documentElement.classList.toggle('dark', isDark)
  }

  const stopEffect = watchEffect(apply)
  media.addEventListener('change', apply)

  onBeforeUnmount(() => {
    stopEffect()
    media.removeEventListener('change', apply)
  })
}
