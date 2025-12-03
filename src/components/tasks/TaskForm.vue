<script setup lang="ts">
interface Props {
  modelValue: string
}

defineProps<Props>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()
</script>

<template>
  <v-form @submit.prevent="$emit('submit')" class="mb-6">
    <v-text-field
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      label="Новая задача"
      :rules="[value => !!value || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
    />
    <v-btn type="submit" color="primary" class="mt-2">
      Добавить
    </v-btn>
  </v-form>
</template>

