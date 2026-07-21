<script setup lang="ts">
import { computed, onMounted } from "vue";
import { ClockIcon } from "@heroicons/vue/24/outline";
import { useHistoryStore } from "@/stores/history";
import AppHeader from "@/components/common/AppHeader.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import EmptyState from "@/components/common/EmptyState.vue";
import HistoryItem from "@/components/features/history/HistoryItem.vue";

const historyStore = useHistoryStore();

onMounted(() => {
  historyStore.load();
});

const searchQuery = computed({
  get: () => historyStore.searchQuery,
  set: (value: string) => historyStore.setSearchQuery(value),
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <AppHeader title="Scan History" />

    <div class="px-5 pt-3">
      <SearchBar v-model="searchQuery" placeholder="Search by barcode…" />
    </div>

    <div class="flex-1 px-5 py-5">
      <EmptyState
        v-if="historyStore.groupedByDay.length === 0"
        :icon="ClockIcon"
        title="No scan history"
        description="Everything you scan will show up here."
      />

      <div v-else class="space-y-6">
        <div v-for="group in historyStore.groupedByDay" :key="group.label">
          <h2
            class="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500"
          >
            {{ group.label }}
          </h2>
          <div>
            <HistoryItem
              v-for="entry in group.entries"
              :key="entry.id"
              :entry="entry"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
