import { defineStore } from 'pinia'
import type { HistoryEntry } from '@/types'
import { historyRepository } from '@/services/storage/historyRepository'
import { generateId } from '@/utils/id'
import { isSameDay, formatDayLabel } from '@/utils/date'

interface HistoryState {
  entries: HistoryEntry[]
  searchQuery: string
  loaded: boolean
}

export interface HistoryGroup {
  label: string
  entries: HistoryEntry[]
}

export const useHistoryStore = defineStore('history', {
  state: (): HistoryState => ({
    entries: [],
    searchQuery: '',
    loaded: false,
  }),

  getters: {
    filteredEntries(state): HistoryEntry[] {
      const query = state.searchQuery.trim().toLowerCase()
      const sorted = [...state.entries].sort((a, b) => b.timestamp - a.timestamp)
      if (!query) return sorted
      return sorted.filter((entry) => entry.barcode.includes(query) || entry.format.toLowerCase().includes(query))
    },

    groupedByDay(): HistoryGroup[] {
      const groups: HistoryGroup[] = []
      for (const entry of this.filteredEntries) {
        const label = formatDayLabel(entry.timestamp)
        const existing = groups.find((g) => g.label === label)
        if (existing) {
          existing.entries.push(entry)
        } else {
          groups.push({ label, entries: [entry] })
        }
      }
      return groups
    },

    todayEntries(state): HistoryEntry[] {
      const now = Date.now()
      return state.entries.filter((entry) => isSameDay(entry.timestamp, now))
    },

    todayScanCount(): number {
      return this.todayEntries.length
    },

    successRate(state): number {
      if (state.entries.length === 0) return 0
      const successCount = state.entries.filter((e) => e.status === 'success').length
      return Math.round((successCount / state.entries.length) * 100)
    },
  },

  actions: {
    load() {
      if (this.loaded) return
      this.entries = historyRepository.loadAll()
      this.loaded = true
    },

    addEntry(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): HistoryEntry {
      const full: HistoryEntry = {
        ...entry,
        id: generateId('scan'),
        timestamp: Date.now(),
      }
      this.entries.unshift(full)
      this.persist()
      return full
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    clear() {
      this.entries = []
      this.persist()
    },

    persist() {
      historyRepository.saveAll(this.entries)
    },
  },
})
