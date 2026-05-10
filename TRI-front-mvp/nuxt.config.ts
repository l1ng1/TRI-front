// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  typescript: {
    strict: true,
    typeCheck: false,
  },
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: 'http://127.0.0.1:8000/api',
    public: {
      // Доступно на клиенте — нужно для WebSocket (он подключается напрямую,
      // не через nitro-прокси, потому что nitro не пропускает живые WS-соединения)
      apiBase: 'http://127.0.0.1:8000',
    },
  },
})
