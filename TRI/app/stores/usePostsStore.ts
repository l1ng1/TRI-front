import { defineStore } from 'pinia'
import type { Post } from '~/types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      posts.value = await $fetch<Post[]>('/api/posts')
    } catch {
      error.value = 'Ошибка загрузки постов'
    } finally {
      loading.value = false
    }
  }

  async function create(data: Partial<Post>) {
    return await $fetch<Post>('/api/posts', { method: 'POST', body: data })
  }

  return { posts, loading, error, fetchAll, create }
})
