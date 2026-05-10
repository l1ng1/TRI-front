import { defineStore } from 'pinia'
import type { Notification } from '~/types'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      notifications.value = await $fetch<Notification[]>('/api/notifications')
    } catch {
      error.value = 'Ошибка загрузки уведомлений'
    } finally {
      loading.value = false
    }
  }

  async function markAsRead(id: number) {
    await $fetch(`/api/notifications/${id}`, { method: 'PATCH', body: { is_read: true } })
    const n = notifications.value.find(n => n.id === id)
    if (n) n.is_read = true
  }

  return { notifications, loading, error, fetchAll, markAsRead }
})
