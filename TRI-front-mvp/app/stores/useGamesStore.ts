import { defineStore } from 'pinia'
import type { Game, GameDetail, GameParticipant, Post } from '~/types'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Game[]>([])             // открытые игры (для поиска)
  const myGames = ref<Game[]>([])           // мои игры
  const currentGame = ref<GameDetail | null>(null)
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

  async function fetchMy() {
    loading.value = true
    error.value = null
    try {
      myGames.value = await $fetch<Game[]>('/api/games/my')
    } catch {
      error.value = 'Ошибка загрузки моих игр'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string | number) {
    loading.value = true
    error.value = null
    try {
      currentGame.value = await $fetch<GameDetail>(`/api/games/${id}`)
    } catch {
      error.value = 'Игра не найдена'
      currentGame.value = null
    } finally {
      loading.value = false
    }
  }

  async function create(data: {
    title: string
    about: string
    rules: string
    max_players: number
  }): Promise<GameDetail | null> {
    error.value = null
    try {
      const game = await $fetch<GameDetail>('/api/games', {
        method: 'POST',
        body: data,
      })
      currentGame.value = game
      return game
    } catch (err: any) {
      error.value = err?.data?.detail || 'Не удалось создать игру'
      return null
    }
  }

  async function joinByCode(invite_code: string, character_id: number | null, role: 'player' | 'spectator' = 'player'): Promise<GameDetail | null> {
    error.value = null
    try {
      const game = await $fetch<GameDetail>('/api/games/join', {
        method: 'POST',
        body: { invite_code, character_id, role },
      })
      currentGame.value = game
      return game
    } catch (err: any) {
      const detail =
        err?.data?.data?.detail ||
        err?.data?.detail ||
        'Не удалось присоединиться'
      error.value = detail
      return null
    }
  }

  async function start(id: number | string): Promise<GameDetail | null> {
    error.value = null
    try {
      const game = await $fetch<GameDetail>(`/api/games/${id}/start`, { method: 'POST' })
      currentGame.value = game
      return game
    } catch (err: any) {
      error.value = err?.data?.data?.detail || err?.data?.detail || 'Не удалось запустить игру'
      return null
    }
  }

  async function end(id: number | string): Promise<GameDetail | null> {
    error.value = null
    try {
      const game = await $fetch<GameDetail>(`/api/games/${id}/end`, { method: 'POST' })
      currentGame.value = game
      return game
    } catch (err: any) {
      error.value = err?.data?.data?.detail || err?.data?.detail || 'Не удалось завершить игру'
      return null
    }
  }

  async function fetchPosts(id: number | string): Promise<Post[]> {
    try {
      return await $fetch<Post[]>(`/api/games/${id}/posts`)
    } catch {
      return []
    }
  }

  async function fetchParticipants(id: number | string): Promise<GameParticipant[]> {
    try {
      return await $fetch<GameParticipant[]>(`/api/games/${id}/participants`)
    } catch {
      return []
    }
  }

  return {
    games, myGames, currentGame, loading, error,
    fetchAll, fetchMy, fetchById,
    create, joinByCode, start, end,
    fetchPosts, fetchParticipants,
  }
})
