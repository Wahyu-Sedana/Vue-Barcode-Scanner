<script setup lang="ts">
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import type { HistoryEntry } from '@/types'
import { formatBarcode, formatBarcodeType } from '@/utils/format'
import { formatTime } from '@/utils/date'

defineProps<{ entry: HistoryEntry }>()
</script>

<template>
  <div class="flex items-start gap-3">
    <div class="flex flex-col items-center">
      <div
        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        :class="entry.status === 'success' ? 'bg-success-50 text-success dark:bg-success/10' : 'bg-error-50 text-error dark:bg-error/10'"
      >
        <CheckIcon v-if="entry.status === 'success'" class="h-4 w-4" />
        <XMarkIcon v-else class="h-4 w-4" />
      </div>
      <div class="mt-1 w-px flex-1 bg-slate-100 dark:bg-slate-800" />
    </div>

    <div class="flex-1 pb-5">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <p class="truncate text-[15px] font-semibold text-slate-900 dark:text-slate-50">
            {{ formatBarcodeType(entry.format) }}
          </p>
          <p class="mt-0.5 font-mono text-xs text-slate-400 dark:text-slate-500">
            {{ formatBarcode(entry.barcode) }}
          </p>
          <p v-if="entry.status === 'failed' && entry.reason" class="mt-1 text-xs font-medium text-error">
            {{ entry.reason }}
          </p>
        </div>
        <span class="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500">
          {{ formatTime(entry.timestamp) }}
        </span>
      </div>
    </div>
  </div>
</template>
