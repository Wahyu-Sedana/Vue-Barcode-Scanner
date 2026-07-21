<script setup lang="ts">
const open = defineModel<boolean>({ default: false })

withDefaults(defineProps<{ dismissible?: boolean }>(), { dismissible: true })

function close() {
  open.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-slate-950/50"
        @click="dismissible && close()"
      />
    </Transition>
    <Transition name="sheet">
      <div
        v-if="open"
        class="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] rounded-t-3xl bg-white shadow-sheet dark:bg-slate-900"
      >
        <div class="flex justify-center pb-1 pt-2.5">
          <div class="h-1.5 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
