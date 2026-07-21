<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ClockIcon as HistoryOutline, Cog6ToothIcon as SettingsOutline, ViewfinderCircleIcon } from '@heroicons/vue/24/outline'
import { ClockIcon as HistorySolid, Cog6ToothIcon as SettingsSolid } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRouter()

function isActive(name: string): boolean {
  return route.name === name
}

function go(name: string) {
  if (!isActive(name)) router.push({ name })
}
</script>

<template>
  <nav class="safe-bottom glass sticky bottom-0 z-30 border-t border-slate-100 dark:border-slate-800">
    <div class="mx-auto flex h-16 max-w-[430px] items-center justify-between px-8">
      <button
        type="button"
        class="flex flex-1 flex-col items-center gap-0.5 py-1 transition active:scale-95"
        @click="go('history')"
      >
        <component
          :is="isActive('history') ? HistorySolid : HistoryOutline"
          class="h-6 w-6"
          :class="isActive('history') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'"
        />
        <span class="text-[11px] font-medium" :class="isActive('history') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
          History
        </span>
      </button>

      <div class="flex flex-1 flex-col items-center">
        <button
          type="button"
          aria-label="Scan barcode"
          class="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-float transition active:scale-90"
          :class="isActive('scanner') ? 'ring-4 ring-primary-100 dark:ring-primary-900' : ''"
          @click="go('scanner')"
        >
          <ViewfinderCircleIcon class="h-7 w-7" />
        </button>
        <span class="mt-0.5 text-[11px] font-medium" :class="isActive('scanner') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
          Scanner
        </span>
      </div>

      <button
        type="button"
        class="flex flex-1 flex-col items-center gap-0.5 py-1 transition active:scale-95"
        @click="go('settings')"
      >
        <component
          :is="isActive('settings') ? SettingsSolid : SettingsOutline"
          class="h-6 w-6"
          :class="isActive('settings') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'"
        />
        <span class="text-[11px] font-medium" :class="isActive('settings') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'">
          Settings
        </span>
      </button>
    </div>
  </nav>
</template>
