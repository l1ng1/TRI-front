export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  return await $fetch(`${apiBase}/characters/${id}/`)
})
