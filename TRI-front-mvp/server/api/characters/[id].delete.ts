import { apiFetch } from '~~/server/utils/api'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  await apiFetch(event, `/characters/${id}/`, { method: 'DELETE' })
  return { success: true }
})
