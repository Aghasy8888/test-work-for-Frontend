import { ref, computed, onMounted } from 'vue'
import type { UserTask, UserTaskFilter } from '@/types'
import { calculateCompletionRate } from '@/helpers'
import { INITIAL_USER_TASKS } from '@/constants'

export const useUserTasks = () => {
  const userTasks = ref<UserTask[]>([])
  const userFilter = ref<UserTaskFilter>('all')

  const filteredUserTasks = computed<UserTask[]>(() => {
    if (userFilter.value === 'active') {
      return userTasks.value.filter(t => !t.completed)
    }

    return userTasks.value
  })

  const completionRate = computed<number>(() =>
    calculateCompletionRate(userTasks.value),
  )

  const loadUserTasks = async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    userTasks.value = INITIAL_USER_TASKS
  }

  onMounted(() => {
    loadUserTasks()
  })

  return {
    // state
    userTasks,
    userFilter,

    // derived
    filteredUserTasks,
    completionRate,

    // actions
    loadUserTasks,
  }
}


