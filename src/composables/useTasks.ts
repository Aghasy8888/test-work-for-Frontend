import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type {
  TaskFilter,
  DeletionTimer,
} from '@/types'
import { useTasksStore } from '@/stores/tasks'

const DELETION_TIMEOUT = 10

export const useTasks = () => {
  const store = useTasksStore()

  const newTaskTitle = ref<string>('')
  const pendingDeletions = ref<Set<number>>(new Set())
  const deletionTimers = ref<Record<number, DeletionTimer>>({})

  const tasks = computed(() => store.tasks)
  const currentFilter = computed({
    get: () => store.currentFilter,
    set: (value: TaskFilter) => store.setFilter(value),
  })
  const changelog = computed(() => store.changelog)
  const filteredTasks = computed(() => store.filteredTasks)
  const taskStats = computed(() => store.taskStats)

  const addTask = () => {
    const title = newTaskTitle.value.trim()
    if (!title) return

    store.addTask(title)
    newTaskTitle.value = ''
  }

  const toggleTask = (id: number) => {
    store.toggleTask(id)
  }

  const cancelDeletion = (id: number) => {
    const timer = deletionTimers.value[id]
    if (!timer) return

    clearInterval(timer.timerId)
    delete deletionTimers.value[id]
    pendingDeletions.value.delete(id)
  }

  const startDeletion = (id: number) => {
    if (pendingDeletions.value.has(id)) return

    pendingDeletions.value.add(id)

    deletionTimers.value[id] = {
      timerId: window.setInterval(() => {
        const timer = deletionTimers.value[id]
        if (!timer) return

        if (--timer.timeLeft <= 0) {
          cancelDeletion(id)
          store.deleteTask(id)
        }
      }, 1000),
      timeLeft: DELETION_TIMEOUT,
    }
  }

  const clearAllTimers = () => {
    Object.values(deletionTimers.value).forEach(({ timerId }) =>
      clearInterval(timerId),
    )
    deletionTimers.value = {}
    pendingDeletions.value.clear()
  }

  onMounted(store.loadTasks)
  onBeforeUnmount(clearAllTimers)

  return {
    // state
    tasks,
    newTaskTitle,
    currentFilter,
    pendingDeletions,
    deletionTimers,
    changelog,

    // derived
    filteredTasks,
    taskStats,

    // actions
    addTask,
    toggleTask,
    startDeletion,
    cancelDeletion,
  }
}

