export type TaskFilter = 'all' | 'active' | 'completed'

export type UserTaskFilter = 'all' | 'active'

export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt?: Date
  completedAt: Date | null
}

export interface UserTask {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  completedAt: Date | null
}

export interface DeletionTimer {
  timerId: number
  timeLeft: number
}

export interface TaskStats {
  total: number
  active: number
  completed: number
  percentage: number
}

export interface TaskFilterConfig {
  value: TaskFilter
  label: string
  key: keyof TaskStats
}


