import type {
  Post,
  GameParticipant,
  WSOutgoing,
  WSIncoming,
} from '~/types'

/**
 * Композабл для подключения к WS-комнате игры.
 *
 * Использование:
 *   const ws = useGameWS(gameId)
 *   await ws.connect()
 *   ws.posts          // ref массив постов
 *   ws.connected      // ref булев
 *   ws.error          // ref строка
 *   ws.online         // ref Set<number> — кто онлайн
 *   ws.sendChat('Привет', characterId)
 *   ws.sendAction('Атакую', characterId, { kind: 'npc', name: 'Волк', strength: 12 })
 *   ws.sendEvent('Появился волк', { name: 'Волк', strength: 12 })
 *   ws.endGame()
 *   ws.disconnect()
 */
export function useGameWS(gameId: number | string) {
  const posts = ref<Post[]>([])
  const connected = ref(false)
  const error = ref<string | null>(null)
  const online = ref<Set<number>>(new Set())
  const lastError = ref<string | null>(null)

  let socket: WebSocket | null = null

  async function connect(initialPosts: Post[] = []) {
    if (socket) {
      socket.close()
      socket = null
    }
    posts.value = [...initialPosts]
    error.value = null
    lastError.value = null

    // Получаем токен с сервера
    let token: string | null = null
    try {
      const resp = await $fetch<{ token: string | null }>('/api/auth/ws-token')
      token = resp.token
    } catch (e) {
      error.value = 'Не удалось получить токен авторизации'
      return
    }
    if (!token) {
      error.value = 'Вы не авторизованы'
      return
    }

    // Адрес бэка для WS — НАПРЯМУЮ, без nitro-прокси (WS через прокси не работает)
    const apiOrigin =
      (useRuntimeConfig().public?.apiBase as string | undefined) ||
      'http://127.0.0.1:8000'
    // Из http://host:port → ws://host:port
    const wsOrigin = apiOrigin.replace(/^http/, 'ws').replace(/\/api\/?$/, '')
    const url = `${wsOrigin}/ws/games/${gameId}/?token=${encodeURIComponent(token)}`

    socket = new WebSocket(url)

    socket.onopen = () => {
      connected.value = true
      error.value = null
    }

    socket.onmessage = (ev: MessageEvent) => {
      try {
        const msg: WSIncoming = JSON.parse(ev.data)
        handleIncoming(msg)
      } catch {
        // ignore
      }
    }

    socket.onerror = () => {
      error.value = 'Ошибка соединения'
    }

    socket.onclose = (ev) => {
      connected.value = false
      // 4401 — неавторизован; 4403 — не участник
      if (ev.code === 4401) error.value = 'Авторизация для этой игры не прошла'
      else if (ev.code === 4403) error.value = 'Вы не участник этой игры'
    }
  }

  function handleIncoming(msg: WSIncoming) {
    switch (msg.type) {
      case 'post.new':
        posts.value.push(msg.post)
        break
      case 'user.joined':
        online.value.add(msg.user_id)
        // Триггерим реактивность
        online.value = new Set(online.value)
        break
      case 'user.left':
        online.value.delete(msg.user_id)
        online.value = new Set(online.value)
        break
      case 'game.ended':
        // подтянем заново — фронт может обновить статус игры
        break
      case 'error':
        lastError.value = msg.message
        break
    }
  }

  function send(payload: WSOutgoing) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      lastError.value = 'Соединение не установлено'
      return false
    }
    socket.send(JSON.stringify(payload))
    return true
  }

  function sendChat(content: string, characterId: number) {
    return send({ type: 'chat', content, character_id: characterId })
  }

  function sendAction(
    content: string,
    characterId: number,
    target?:
      | { kind: 'npc'; name: string; strength: number }
      | { kind: 'character'; id: number },
  ) {
    return send({ type: 'action', content, character_id: characterId, target })
  }

  function sendEvent(content: string, npc?: { name: string; strength: number }) {
    return send({ type: 'event', content, npc })
  }

  function endGame() {
    return send({ type: 'end_game' })
  }

  function disconnect() {
    if (socket) {
      socket.close()
      socket = null
    }
    connected.value = false
  }

  // авто-disconnect при размонтировании
  onBeforeUnmount(() => {
    disconnect()
  })

  return {
    posts,
    connected,
    error,
    lastError,
    online,
    connect,
    disconnect,
    sendChat,
    sendAction,
    sendEvent,
    endGame,
  }
}
