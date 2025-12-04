<script setup lang="ts">
import { computed } from 'vue'
import { useTasks } from '@/composables'
import {
  TaskFilters,
  TaskForm,
  TaskList,
  TaskStatsCard,
  TaskChangelog,
} from '@/components'

const {
  newTaskTitle,
  currentFilter,
  pendingDeletions,
  deletionTimers,
  filteredTasks,
  taskStats,
  addTask,
  toggleTask,
  startDeletion,
  cancelDeletion,
  changelog,
} = useTasks()

const pendingDeletionIds = computed(() =>
  Array.from(pendingDeletions.value.values()),
)
</script>

<template>
  <v-app>
    <v-app-bar color="white" density="compact">
      <img
        class="logo ml-12 mr-4"
        src="https://storage.yandexcloud.net/forlogo/logo.svg"
        alt="Логотип"
        fetchpriority="high"
      />
      <v-app-bar-title>Управление задачами</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="8">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h1 class="text-h4 mb-4">Мои задачи</h1>

                  <TaskFilters
                    :current-filter="currentFilter"
                    :stats="taskStats"
                    @update:current-filter="currentFilter = $event"
                  />

                  <TaskForm
                    :model-value="newTaskTitle"
                    @update:model-value="newTaskTitle = $event"
                    @submit="addTask"
                  />

                  <TaskList
                    :tasks="filteredTasks"
                    :pending-deletion-ids="pendingDeletionIds"
                    :deletion-timers="deletionTimers"
                    @toggle="toggleTask"
                    @start-deletion="startDeletion"
                    @cancel-deletion="cancelDeletion"
                  />

                  <TaskStatsCard :stats="taskStats" />
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="12" md="4">
            <TaskChangelog :entries="changelog" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>
