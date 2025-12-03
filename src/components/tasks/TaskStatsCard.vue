<script setup lang="ts">
import type { TaskStats } from '@/types'

interface Props {
  stats: TaskStats
}

defineProps<Props>()
</script>

<template>
  <v-card class="mt-6">
    <v-card-text>
      <p>Всего задач: {{ stats.total }}</p>
      <p>Активных: {{ stats.active }}</p>
      <p>Завершенных: {{ stats.completed }}</p>
      <p>
        Процент завершения:
        {{ stats.percentage.toFixed(1) }}%
      </p>
    </v-card-text>
  </v-card>
</template>

