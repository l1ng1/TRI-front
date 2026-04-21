import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      users.value = await $fetch<User[]>('/api/users')
    } catch {
      error.value = 'Ошибка загрузки пользователей'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string | number) {
    loading.value = true
    error.value = null
    try {
      currentUser.value = await $fetch<User>(`/api/users/${id}`)
    } catch {
      error.value = 'Пользователь не найден'
      currentUser.value = null
    } finally {
      loading.value = false
    }
  }

  return { users, currentUser, loading, error, fetchAll, fetchById }
})
