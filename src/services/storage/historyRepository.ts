import type { HistoryEntry } from '@/types'
import { readJSON, writeJSON } from './localStorage'

const STORAGE_KEY = 'scanly.history.v1'

export const historyRepository = {
  loadAll(): HistoryEntry[] {
    return readJSON<HistoryEntry[]>(STORAGE_KEY, [])
  },
  saveAll(entries: HistoryEntry[]): void {
    writeJSON(STORAGE_KEY, entries)
  },
}
