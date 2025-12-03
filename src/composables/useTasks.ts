import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { Task, TaskFilter, DeletionTimer, TaskStats } from '@/types'
import { calculateTaskStats } from '@/helpers'
import { INITIAL_TASKS } from '@/constants'

export const useTasks = () => {
  const tasks = ref<Task[]>([])
  const newTaskTitle = ref<string>('')
  const currentFilter = ref<TaskFilter>('all')

  const pendingDeletions = ref<Set<number>>(new Set())
  const deletionTimers = ref<Record<number, DeletionTimer>>({})

  const filteredTasks = computed<Task[]>(() => {
    switch (currentFilter.value) {
      case 'active':
        return tasks.value.filter(t => !t.completed)
      case 'completed':
        return tasks.value.filter(t => t.completed)
      default:
        return tasks.value
    }
  })

  const taskStats = computed<TaskStats>(() => calculateTaskStats(tasks.value))

  const loadTasks = async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    tasks.value = INITIAL_TASKS
  }

  const addTask = () => {
    const title = newTaskTitle.value.trim()
    if (!title) return

    const now = new Date()
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    }

    tasks.value.push(newTask)
    newTaskTitle.value = ''
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return

    task.completed = !task.completed
    task.updatedAt = new Date()
    task.completedAt = task.completed ? new Date() : null
  }

  const startDeletion = (id: number) => {
    if (pendingDeletions.value.has(id)) return

    pendingDeletions.value.add(id)

    const timerId = window.setInterval(() => {
      const timer = deletionTimers.value[id]
      if (!timer) return

      timer.timeLeft -= 1

      if (timer.timeLeft <= 0) {
        tasks.value = tasks.value.filter(t => t.id !== id)
        pendingDeletions.value.delete(id)

        clearInterval(timer.timerId)
        delete deletionTimers.value[id]
      }
    }, 1000)

    deletionTimers.value[id] = {
      timerId,
      timeLeft: 10,
    }
  }

  const cancelDeletion = (id: number) => {
    pendingDeletions.value.delete(id)

    const timer = deletionTimers.value[id]
    if (timer) {
      clearInterval(timer.timerId)
      delete deletionTimers.value[id]
    }
  }

  const clearAllTimers = () => {
    Object.values(deletionTimers.value).forEach(timer => {
      clearInterval(timer.timerId)
    })
    deletionTimers.value = {}
    pendingDeletions.value.clear()
  }

  onMounted(() => {
    loadTasks()
  })

  onBeforeUnmount(() => {
    clearAllTimers()
  })

  return {
    // state
    tasks,
    newTaskTitle,
    currentFilter,
    pendingDeletions,
    deletionTimers,

    // derived
    filteredTasks,
    taskStats,

    // actions
    loadTasks,
    addTask,
    toggleTask,
    startDeletion,
    cancelDeletion,
  }
}


