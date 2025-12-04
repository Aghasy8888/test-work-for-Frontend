import type { Task, UserTask, TaskStats, TaskChangelogAction } from '@/types'
import {
  mdiPlusCircle,
  mdiCheckCircle,
  mdiUndo,
  mdiDelete,
  mdiInformation,
} from '@mdi/js'

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const total = tasks.length
  if (total === 0) return { total: 0, active: 0, completed: 0, percentage: 0 }
  
  const completed = tasks.reduce((sum, t) => sum + (t.completed ? 1 : 0), 0)
  const active = total - completed
  const percentage = Math.round((completed / total) * 1000) / 10

  return { total, active, completed, percentage }
}

export const calculateCompletionRate = (tasks: UserTask[]): number => {
  if (!tasks.length) return 0
  const completed = tasks.reduce((sum, t) => sum + (t.completed ? 1 : 0), 0)
  return Math.round((completed / tasks.length) * 1000) / 10
}

export const truncateTaskTitle = (title: string, maxLength = 40): string => {
  if (title.length <= maxLength) return title
  return `${title.slice(0, maxLength - 1)}…`
}

export const getActionMeta = (action: TaskChangelogAction) => {
  switch (action) {
    case 'created':
      return { color: 'primary', icon: mdiPlusCircle, label: 'Создана задача' }
    case 'completed':
      return { color: 'success', icon: mdiCheckCircle, label: 'Завершена задача' }
    case 'uncompleted':
      return { color: 'warning', icon: mdiUndo, label: 'Возобновлена задача' }
    case 'deleted':
      return { color: 'error', icon: mdiDelete, label: 'Удалена задача' }
    default:
      return { color: 'grey', icon: mdiInformation, label: 'Изменение задачи' }
  }
}