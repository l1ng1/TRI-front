export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  await $fetch(`${apiBase}/characters/${id}/`, { method: 'DELETE' })
  return { success: true }
})
