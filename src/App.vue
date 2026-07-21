<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import BottomNavigation from '@/components/common/BottomNavigation.vue'
import ToastHost from '@/components/common/ToastHost.vue'

useTheme()
</script>

<template>
  <div class="app-shell">
    <router-view v-slot="{ Component, route }">
      <transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" class="flex flex-1 flex-col" />
      </transition>
    </router-view>

    <BottomNavigation v-if="$route.meta.showBottomNav" />
    <ToastHost />
  </div>
</template>
