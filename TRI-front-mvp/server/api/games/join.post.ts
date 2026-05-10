import { apiFetch } from '~~/server/utils/api'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return apiFetch(event, '/games/join/', { method: 'POST', body })
})
