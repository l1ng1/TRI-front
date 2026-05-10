import { setAuthCookies } from '~~/server/utils/api'

export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const body = await readBody(event)
  try {
    const resp: any = await $fetch(`${apiBase}/auth/register/`, {
      method: 'POST',
      body,
    })
    setAuthCookies(event, resp.access, resp.refresh)
    return { user: resp.user }
  } catch (err: any) {
    throw createError({
      statusCode: err?.response?.status || 500,
      statusMessage: 'Ошибка регистрации',
      data: err?.response?._data || err?.data || { detail: 'Неизвестная ошибка' },
    })
  }
})
