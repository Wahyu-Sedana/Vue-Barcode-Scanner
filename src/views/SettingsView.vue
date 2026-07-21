<script setup lang="ts">
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/outline'
import type { ThemeMode } from '@/types'
import { useSettingStore } from '@/stores/settings'
import AppHeader from '@/components/common/AppHeader.vue'

const settings = useSettingStore()

const themeOptions: { value: ThemeMode; label: string; icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: ComputerDesktopIcon },
]

const APP_VERSION = '1.0.0'
</script>

<template>
  <div class="flex flex-1 flex-col">
    <AppHeader title="Settings" />

    <div class="flex-1 space-y-7 px-5 py-5">
      <!-- Theme -->
      <section>
        <h2 class="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">Theme</h2>
        <div class="grid grid-cols-3 gap-2.5">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            type="button"
            class="flex flex-col items-center gap-2 rounded-2xl border py-4 transition active:scale-95"
            :class="
              settings.theme === option.value
                ? 'border-primary bg-primary-50 text-primary dark:bg-primary-900/20'
                : 'border-slate-100 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
            "
            @click="settings.setTheme(option.value)"
          >
            <component :is="option.icon" class="h-5 w-5" />
            <span class="text-xs font-semibold">{{ option.label }}</span>
          </button>
        </div>
      </section>

      <!-- Scanner options -->
      <section>
        <h2 class="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Scanner Options
        </h2>
        <div class="divide-y divide-slate-100 rounded-2xl bg-white shadow-card ring-1 ring-slate-100 dark:divide-slate-800 dark:bg-slate-900 dark:ring-slate-800">
          <div class="flex items-center justify-between px-4 py-3.5">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">Enable Sound</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Play a beep on successful scan</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="settings.soundEnabled"
              class="relative h-7 w-12 shrink-0 rounded-full transition"
              :class="settings.soundEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
              @click="settings.toggleSound(!settings.soundEnabled)"
            >
              <span
                class="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
                :class="settings.soundEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'"
              />
            </button>
          </div>

          <div class="flex items-center justify-between px-4 py-3.5">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">Enable Vibration</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Haptic feedback on scan</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="settings.vibrationEnabled"
              class="relative h-7 w-12 shrink-0 rounded-full transition"
              :class="settings.vibrationEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
              @click="settings.toggleVibration(!settings.vibrationEnabled)"
            >
              <span
                class="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
                :class="settings.vibrationEnabled ? 'translate-x-[22px]' : 'translate-x-0.5'"
              />
            </button>
          </div>

          <div class="flex items-center justify-between px-4 py-3.5">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">Auto Continue Scan</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Resume scanning right after a match</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="settings.autoContinueScan"
              class="relative h-7 w-12 shrink-0 rounded-full transition"
              :class="settings.autoContinueScan ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
              @click="settings.toggleAutoContinue(!settings.autoContinueScan)"
            >
              <span
                class="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
                :class="settings.autoContinueScan ? 'translate-x-[22px]' : 'translate-x-0.5'"
              />
            </button>
          </div>

          <div class="flex items-center justify-between px-4 py-3.5">
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">Flash Default</p>
              <p class="text-xs text-slate-400 dark:text-slate-500">Turn on torch when scanner opens</p>
            </div>
            <button
              type="button"
              role="switch"
              :aria-checked="settings.flashDefault"
              class="relative h-7 w-12 shrink-0 rounded-full transition"
              :class="settings.flashDefault ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'"
              @click="settings.toggleFlashDefault(!settings.flashDefault)"
            >
              <span
                class="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
                :class="settings.flashDefault ? 'translate-x-[22px]' : 'translate-x-0.5'"
              />
            </button>
          </div>
        </div>
      </section>

      <!-- About -->
      <section>
        <h2 class="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">About App</h2>
        <div class="flex items-center justify-between rounded-2xl bg-white px-4 py-3.5 shadow-card ring-1 ring-slate-100 dark:bg-slate-900 dark:ring-slate-800">
          <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">Version</p>
          <p class="text-sm font-medium text-slate-400 dark:text-slate-500">{{ APP_VERSION }}</p>
        </div>
      </section>
    </div>
  </div>
</template>
