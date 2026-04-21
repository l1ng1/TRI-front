export default defineEventHandler(async () => {
  const { apiBase } = useRuntimeConfig()
  return await $fetch(`${apiBase}/notifications/`)
})
