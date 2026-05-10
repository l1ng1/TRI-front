import { setAuthCookies } from '~~/server/utils/api'

export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const body = await readBody(event)
  let tokens: any
  try {
    tokens = await $fetch(`${apiBase}/auth/login/`, { method: 'POST', body })
  } catch (err: any) {
    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: 'Ошибка входа',
      data: err?.response?._data || err?.data || { detail: 'Неверный логин или пароль' },
    })
  }
  setAuthCookies(event, tokens.access, tokens.refresh)
  let user: any = null
  try {
    user = await $fetch(`${apiBase}/auth/me/`, {
      headers: { Authorization: `Bearer ${tokens.access}` },
    })
  } catch { user = null }
  return { user }
})
