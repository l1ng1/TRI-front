import { defineStore } from 'pinia'
import type { User } from '~/types'

export const useUserStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const me = ref<User | null>(null)
  const authLoading = ref(false)
  const authError = ref<string | null>(null)
  const isAuthenticated = computed(() => me.value !== null)

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

  async function fetchMe() {
    try {
      const resp = await $fetch<{ user: User | null }>('/api/auth/me')
      me.value = resp.user
    } catch {
      me.value = null
    }
  }

  async function login(username: string, password: string): Promise<boolean> {
    authLoading.value = true
    authError.value = null
    try {
      const resp = await $fetch<{ user: User | null }>('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      })
      me.value = resp.user
      return true
    } catch (err: any) {
      const data = err?.data?.data || err?.data
      authError.value = data?.detail || 'Не удалось войти. Проверь логин и пароль'
      me.value = null
      return false
    } finally {
      authLoading.value = false
    }
  }

  async function register(username: string, password: string, passwordConfirm: string): Promise<boolean> {
    authLoading.value = true
    authError.value = null
    try {
      const resp = await $fetch<{ user: User }>('/api/auth/register', {
        method: 'POST',
        body: { username, password, password_confirm: passwordConfirm },
      })
      me.value = resp.user
      return true
    } catch (err: any) {
      const data = err?.data?.data || err?.data || {}
      const messages: string[] = []
      for (const key of Object.keys(data)) {
        const val = data[key]
        if (Array.isArray(val)) messages.push(...val)
        else if (typeof val === 'string') messages.push(val)
      }
      authError.value = messages.join(' ') || 'Не удалось зарегистрироваться'
      me.value = null
      return false
    } finally {
      authLoading.value = false
    }
  }

  async function logout() {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    me.value = null
  }

  return {
    users, currentUser, loading, error, fetchAll, fetchById,
    me, authLoading, authError, isAuthenticated,
    fetchMe, login, register, logout,
  }
})
