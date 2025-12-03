import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { Serializer } from 'pinia-plugin-persistedstate'

interface SerializedDate {
  __type: 'Date'
  value: string
}

const isDateObject = (val: unknown): val is SerializedDate => {
  if (!val || typeof val !== 'object') return false

  const candidate = val as Partial<SerializedDate>
  return candidate.__type === 'Date' && typeof candidate.value === 'string'
}

const dateSerializer: Serializer = {
  serialize: (value) =>
    JSON.stringify(value, (_, val) =>
      val instanceof Date ? { __type: 'Date', value: val.toISOString() } : val,
    ),

  deserialize: (value) =>
    JSON.parse(value, (_, val) =>
      isDateObject(val) ? new Date(val.value) : val,
    ),
}

const pinia = createPinia()

pinia.use(
  createPersistedState({
    storage: localStorage,
    serializer: dateSerializer,
  }),
)

export default pinia

