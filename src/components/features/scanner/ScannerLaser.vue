<script setup lang="ts">
withDefaults(defineProps<{ active?: boolean }>(), { active: true })
</script>

<template>
  <div class="pointer-events-none absolute inset-x-3 top-0 h-full overflow-hidden">
    <div
      v-if="active"
      class="absolute inset-x-0 h-0.5 animate-laser-scan rounded-full bg-primary shadow-[0_0_12px_2px_rgba(37,99,235,0.75)]"
    />
  </div>
</template>
