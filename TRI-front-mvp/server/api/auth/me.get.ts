import { apiFetch, getAccessCookie } from '~~/server/utils/api'

export default defineEventHandler(async (event) => {
  if (!getAccessCookie(event)) return { user: null }
  try {
    const user = await apiFetch(event, '/auth/me/')
    return { user }
  } catch {
    return { user: null }
  }
})
