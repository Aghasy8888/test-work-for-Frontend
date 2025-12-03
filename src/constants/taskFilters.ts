import type { TaskFilter, TaskFilterConfig, UserTaskFilter } from '@/types'

export const TASK_FILTERS: TaskFilter[] = ['all', 'active', 'completed']

export const USER_TASK_FILTERS: UserTaskFilter[] = ['all', 'active']

export const TASK_FILTER_CONFIGS: readonly TaskFilterConfig[] = [
  { value: 'all', label: 'Все', key: 'total' },
  { value: 'active', label: 'Активные', key: 'active' },
  { value: 'completed', label: 'Завершенные', key: 'completed' },
] as const

