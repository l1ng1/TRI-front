import { useUserStore } from '~/stores/useUserStore'
 
/**
 * При старте подтягиваем текущего пользователя.
 *
 * ВАЖНО: только на клиенте. На SSR кука HttpOnly не пробрасывается
 * автоматически в локальный $fetch, поэтому SSR-вызов вернёт null,
 * а клиент через куку получит юзера → hydration mismatch (шапка
 * нарисуется по-разному).
 *
 * Решение — выполнять только на клиенте. На SSR me=null, на гидрации
 * me=null, после mount плагин один раз дёрнет /me/ и всё обновится.
 */
export default defineNuxtPlugin(async () => {
  if (import.meta.server) return
  const userStore = useUserStore()
  await userStore.fetchMe()
})