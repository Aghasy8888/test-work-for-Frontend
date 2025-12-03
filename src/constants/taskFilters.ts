import type { TaskFilterConfig } from '@/types'

export const TASK_FILTER_CONFIGS: readonly TaskFilterConfig[] = [
  { value: 'all', label: 'Все', key: 'total' },
  { value: 'active', label: 'Активные', key: 'active' },
  { value: 'completed', label: 'Завершенные', key: 'completed' },
] as const

export const ALL = 'all';