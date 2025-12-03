<script setup lang="ts">
import type { Task, DeletionTimer } from '@/types'
import { formatDate } from '@/helpers'

interface Props {
  tasks: Task[]
  pendingDeletionIds: number[]
  deletionTimers: Record<number, DeletionTimer>
  defaultDeletionSeconds?: number
}

withDefaults(defineProps<Props>(), {
  defaultDeletionSeconds: 10,
})

defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'startDeletion', id: number): void
  (e: 'cancelDeletion', id: number): void
}>()
</script>

<template>
  <v-list lines="two" class="elevation-1 rounded">
    <v-list-item v-for="task in tasks" :key="task.id">
      <template #prepend>
        <v-checkbox
          :model-value="task.completed"
          @update:model-value="$emit('toggle', task.id)"
          density="comfortable"
        />
      </template>

      <v-list-item-title
        :class="{
          'text-decoration-line-through text-grey': task.completed,
        }"
        class="font-weight-medium"
      >
        {{ task.title }}
      </v-list-item-title>

      <v-list-item-subtitle>
        Создано: {{ formatDate(task.createdAt) }} |
        Обновлено: {{ formatDate(task.updatedAt) }}
        <span v-if="task.completed">
          | Завершено: {{ formatDate(task.completedAt) }}
        </span>
      </v-list-item-subtitle>

      <template #append>
        <div
          v-if="pendingDeletionIds.includes(task.id)"
          class="deletion-pending"
        >
          <v-chip color="error" size="small" class="mr-2">
            Удаление через
            {{ deletionTimers[task.id]?.timeLeft ?? defaultDeletionSeconds }}
          </v-chip>
          <v-btn
            @click="$emit('cancelDeletion', task.id)"
            variant="text"
            color="warning"
            size="small"
          >
            Отмена
          </v-btn>
        </div>
        <v-btn
          v-else
          icon
          @click="$emit('startDeletion', task.id)"
          variant="text"
          color="error"
          size="small"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.deletion-pending {
  display: flex;
  align-items: center;
}

.text-decoration-line-through {
  text-decoration: line-through;
}
</style>

