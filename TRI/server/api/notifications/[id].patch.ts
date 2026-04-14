export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  return await $fetch(`${apiBase}/notifications/${id}/`, { method: 'PATCH', body })
})
