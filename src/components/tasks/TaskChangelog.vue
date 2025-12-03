<script setup lang="ts">
import { computed } from 'vue'
import type { TaskChangelogEntry } from '@/types'
import { formatDate, truncateTaskTitle, getActionMeta } from '@/helpers'

interface Props {
  entries: TaskChangelogEntry[]
  maxItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxItems: 10,
})

const visibleEntries = computed(() =>
  props.entries.slice(0, props.maxItems),
)
</script>

<template>
  <v-card class="mt-6">
    <v-card-title class="text-subtitle-1 font-weight-medium">
      История изменений
    </v-card-title>

    <v-card-text>
      <div v-if="!visibleEntries.length" class="text-medium-emphasis text-body-2">
        Изменений пока нет. Выполните действия с задачами, чтобы увидеть историю.
      </div>

      <v-list v-else density="comfortable" class="py-0">
        <v-list-item
          v-for="entry in visibleEntries"
          :key="entry.id"
        >
          <template #prepend>
            <v-avatar :color="getActionMeta(entry.action).color" size="32">
              <v-icon color="white" :icon="getActionMeta(entry.action).icon" />
            </v-avatar>
          </template>

          <v-list-item-title class="text-body-2 font-weight-medium">
            {{ truncateTaskTitle(entry.taskTitle) }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-caption">
            {{ getActionMeta(entry.action).label }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="text-caption">
            {{ formatDate(entry.timestamp) }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>


