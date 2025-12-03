<script setup lang="ts">
import type { TaskFilter, TaskStats } from '@/types'
import { TASK_FILTER_CONFIGS } from '@/constants/taskFilters'

interface Props {
  currentFilter: TaskFilter
  stats: TaskStats
}

defineProps<Props>()

defineEmits<{
  (e: 'update:currentFilter', value: TaskFilter): void
}>()

</script>

<template>
  <div class="filter-section mb-4">
    <v-btn
      v-for="filter in TASK_FILTER_CONFIGS"
      :key="filter.value"
      @click="$emit('update:currentFilter', filter.value)"
      :class="{ 'bg-primary': currentFilter === filter.value }"
      variant="tonal"
    >
      {{ filter.label }} ({{ stats[filter.key] }})
    </v-btn>
  </div>
</template>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section .v-btn {
    width: 100%;
  }
}
</style>

