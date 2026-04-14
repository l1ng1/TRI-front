export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig()
  const body = await readBody(event)
  return await $fetch(`${apiBase}/characters/`, { method: 'POST', body })
})
