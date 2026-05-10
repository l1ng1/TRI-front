import { defineStore } from 'pinia'
import type { Character } from '~/types'

export const useCharactersStore = defineStore('characters', () => {
  const characters = ref<Character[]>([])
  const currentCharacter = ref<Character | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      characters.value = await $fetch<Character[]>('/api/characters')
    } catch {
      error.value = 'Ошибка загрузки персонажей'
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id: string | number) {
    loading.value = true
    error.value = null
    try {
      currentCharacter.value = await $fetch<Character>(`/api/characters/${id}`)
    } catch {
      error.value = 'Персонаж не найден'
      currentCharacter.value = null
    } finally {
      loading.value = false
    }
  }

  async function create(data: Partial<Character>) {
    return await $fetch<Character>('/api/characters', { method: 'POST', body: data })
  }

  async function update(id: string | number, data: Partial<Character>) {
    return await $fetch<Character>(`/api/characters/${id}`, { method: 'PATCH', body: data })
  }

  async function remove(id: string | number) {
    await $fetch(`/api/characters/${id}`, { method: 'DELETE' })
  }

  return { characters, currentCharacter, loading, error, fetchAll, fetchById, create, update, remove }
})
