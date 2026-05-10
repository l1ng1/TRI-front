import { apiFetch } from '~~/server/utils/api'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  return apiFetch(event, `/characters/${id}/`, { method: 'PATCH', body })
})
