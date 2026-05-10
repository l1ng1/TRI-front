/**
 * Возвращает текущий access-токен из куки в JSON.
 * Нужен потому, что WebSocket из браузера не может прочитать HttpOnly-куку
 * и должен передать токен в query-параметре.
 *
 * Если access протух - apiFetch автоматически обновит его через refresh.
 */
import { apiFetch, getAccessCookie } from '~~/server/utils/api'

export default defineEventHandler(async (event) => {
  // Триггерим apiFetch на /auth/me/ чтобы при необходимости refresh-нулся access
  try {
    await apiFetch(event, '/auth/me/')
  } catch {
    return { token: null }
  }
  return { token: getAccessCookie(event) || null }
})
