import { clearAuthCookies } from '~~/server/utils/api'

export default defineEventHandler((event) => {
  clearAuthCookies(event)
  return { success: true }
})
