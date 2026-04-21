import { defineStore } from 'pinia'
import type { Game } from '~/types'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])
  const currentGame = ref<Game | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      games.value = await $fetch<Game[]>('/api/games')
    } catch {
      error.value = 'Ошибка загрузки игр'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string | number) {
    loading.value = true
    error.value = null
    try {
      currentGame.value = await $fetch<Game>(`/api/games/${id}`)
    } catch {
      error.value = 'Игра не найдена'
      currentGame.value = null
    } finally {
      loading.value = false
    }
  }

  return { games, currentGame, loading, error, fetchAll, fetchById }
})
