export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  return await $fetch(`${apiBase}/users/${id}/`)
})
