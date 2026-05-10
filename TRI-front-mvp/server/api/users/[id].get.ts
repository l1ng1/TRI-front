import { apiFetch } from '~~/server/utils/api'
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  return apiFetch(event, `/users/${id}/`)
})
