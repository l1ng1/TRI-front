export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  return await $fetch(`${apiBase}/characters/${id}/`, { method: 'PATCH', body })
})
