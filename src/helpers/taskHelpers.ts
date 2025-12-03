import type { Task, UserTask, TaskStats } from '@/types'

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