import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type {
  Task,
  TaskFilter,
  TaskStats,
  TaskChangelogEntry,
  TaskChangelogAction,
} from '@/types'
import { calculateTaskStats } from '@/helpers'
import {
  INITIAL_TASKS,
  TASK_ACTION_CREATED,
  TASK_ACTION_COMPLETED,
  TASK_ACTION_UNCOMPLETED,
  TASK_ACTION_DELETED,
  ALL,
} from '@/constants'

const FILTER_FUNCTIONS: Record<TaskFilter, (task: Task) => boolean> = {
  all: () => true,
  active: (t) => !t.completed,
  completed: (t) => t.completed,
}

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<Task[]>([])
    const changelog = ref<TaskChangelogEntry[]>([])
    const currentFilter = ref<TaskFilter>(ALL)

    const filteredTasks = computed<Task[]>(() =>
      tasks.value.filter(FILTER_FUNCTIONS[currentFilter.value]),
    )

    const taskStats = computed<TaskStats>(() =>
      calculateTaskStats(tasks.value),
    )

    const addChangelogEntry = (task: Task, action: TaskChangelogAction) => {
      changelog.value.unshift({
        id: Date.now(),
        taskId: task.id,
        taskTitle: task.title,
        action,
        timestamp: new Date(),
      })
    }

    const loadTasks = async () => {
      if (tasks.value.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 300))
        tasks.value = INITIAL_TASKS
      }
    }

    const addTask = (title: string) => {
      const trimmedTitle = title.trim()
      if (!trimmedTitle) return

      const now = new Date()
      const newTask: Task = {
        id: Date.now(),
        title: trimmedTitle,
        completed: false,
        createdAt: now,
        updatedAt: now,
        completedAt: null,
      }

      tasks.value.push(newTask)
      addChangelogEntry(newTask, TASK_ACTION_CREATED)
    }

    const toggleTask = (id: number) => {
      const taskIndex = tasks.value.findIndex((t) => t.id === id)
      if (taskIndex === -1) return

      const task = tasks.value[taskIndex]!
      const now = new Date()

      task.completed = !task.completed
      task.updatedAt = now
      task.completedAt = task.completed ? now : null

      addChangelogEntry(
        task,
        task.completed ? TASK_ACTION_COMPLETED : TASK_ACTION_UNCOMPLETED,
      )
    }

    const deleteTask = (id: number) => {
      const taskIndex = tasks.value.findIndex((t) => t.id === id)
      if (taskIndex === -1) return

      addChangelogEntry(tasks.value[taskIndex]!, TASK_ACTION_DELETED)
      tasks.value.splice(taskIndex, 1)
    }

    const setFilter = (value: TaskFilter) => {
      currentFilter.value = value
    }

    return {
      // State
      tasks,
      changelog,
      currentFilter,

      // Getters
      filteredTasks,
      taskStats,

      // Actions
      loadTasks,
      addTask,
      toggleTask,
      deleteTask,
      setFilter,
      addChangelogEntry,
    }
  },
  {
    persist: {
      pick: ['tasks', 'changelog', 'currentFilter'],
    },
  },
)

