<template>
    <div class="room-page">
        <!-- Загрузка -->
        <div v-if="!gameLoaded" class="cont loading-state">Загрузка игры...</div>

        <template v-else-if="game">
            <!-- Шапка комнаты -->
            <div class="room-header">
                <div class="cont room-header-inner">
                    <div class="room-header-left">
                        <NuxtLink to="/games" class="back-link">← Назад</NuxtLink>
                        <h1 class="room-title">{{ game.title }}</h1>
                        <span class="status-badge" :class="`status--${game.status}`">
                            {{ statusLabel(game.status) }}
                        </span>
                    </div>
                    <div class="room-header-right">
                        <div v-if="game.is_master" class="invite-code-box" :title="'Код приглашения'">
                            <span class="invite-label">Код:</span>
                            <code class="invite-code">{{ game.invite_code }}</code>
                            <button class="btn-icon" @click="copyInvite" :title="copied ? 'Скопировано' : 'Скопировать'">
                                {{ copied ? '✓' : '⧉' }}
                            </button>
                        </div>
                        <button v-if="game.is_master && game.status === 'pending'" class="btn btn-sm" @click="onStart">
                            Запустить
                        </button>
                        <button v-if="game.is_master && game.status === 'active'" class="btn btn-sm btn-danger" @click="onEnd">
                            Завершить
                        </button>
                        <span v-if="amParticipant && connectionStatus" class="conn-pill" :class="`conn--${connectionStatus}`">
                            {{ connectionStatusLabel }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Заглушка для не-участников -->
            <div v-if="!amParticipant" class="cont not-participant">
                <div class="card not-participant-card">
                    <div class="not-participant-icon">🚪</div>
                    <h2 class="not-participant-title">Вы пока не в этой игре</h2>
                    <p class="not-participant-text">
                        Чтобы участвовать в чате и действиях, нужно присоединиться к игре.
                        Попросите у мастера ({{ masterName }}) код приглашения.
                    </p>
                    <div class="not-participant-actions">
                        <NuxtLink to="/games/join" class="btn">У меня есть код</NuxtLink>
                        <NuxtLink v-if="!hasCharacters" to="/characters/charForm" class="btn btn-ghost">
                            Сначала создать персонажа
                        </NuxtLink>
                    </div>
                </div>

                <!-- Текущий состав игры — для информации -->
                <div class="card not-participant-card">
                    <h3 class="participants-info-title">Кто уже в игре</h3>
                    <ul class="participants-list">
                        <li v-for="p in game.participants" :key="p.id" class="participant" :class="{ 'participant--gm': p.role === 'gm' }">
                            <div class="participant-avatar">{{ p.username[0]?.toUpperCase() }}</div>
                            <div class="participant-info">
                                <div class="participant-name">
                                    <span>{{ p.username }}</span>
                                    <span v-if="p.role === 'gm'" class="role-badge role--gm">мастер</span>
                                    <span v-else-if="p.role === 'spectator'" class="role-badge">наблюдатель</span>
                                </div>
                                <div v-if="p.character_name" class="participant-char">
                                    {{ p.character_name }} · сила {{ p.character_strength }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Тело: 3 колонки (только для участников) -->
            <div v-else class="cont room-body">
                <!-- Левая колонка: участники -->
                <aside class="card sidebar">
                    <h2 class="sidebar-title">Участники</h2>
                    <ul class="participants-list">
                        <li
                            v-for="p in game.participants"
                            :key="p.id"
                            class="participant"
                            :class="{ 'participant--online': online.has(p.user_id), 'participant--gm': p.role === 'gm' }"
                        >
                            <div class="participant-avatar">{{ p.username[0]?.toUpperCase() }}</div>
                            <div class="participant-info">
                                <div class="participant-name">
                                    <span>{{ p.username }}</span>
                                    <span v-if="p.role === 'gm'" class="role-badge role--gm">мастер</span>
                                    <span v-else-if="p.role === 'spectator'" class="role-badge">наблюдатель</span>
                                </div>
                                <div v-if="p.character_name" class="participant-char">
                                    {{ p.character_name }} · сила {{ p.character_strength }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </aside>

                <!-- Центр: лента + ввод -->
                <main class="card chat-card">
                    <div class="chat-feed" ref="feedRef">
                        <p v-if="!ws.posts.value.length" class="empty-feed">
                            <template v-if="game.status === 'pending'">
                                Игра ещё не запущена. Мастер должен нажать «Запустить».
                            </template>
                            <template v-else>Постов пока нет. Начните диалог!</template>
                        </p>
                        <div
                            v-for="post in ws.posts.value"
                            :key="post.id"
                            class="post"
                            :class="`post--${post.kind}`"
                        >
                            <template v-if="post.kind === 'system'">
                                <div class="system-line">
                                    <span class="system-icon">⚔️</span>
                                    <span>{{ post.content }}</span>
                                </div>
                            </template>

                            <template v-else-if="post.kind === 'event'">
                                <div class="post-author event-author">
                                    Событие · мастер {{ post.user_username }}
                                </div>
                                <div class="post-content event-content">{{ post.content }}</div>
                                <div v-if="post.event_data?.npc" class="event-npc">
                                    👤 {{ post.event_data.npc.name }} (сила {{ post.event_data.npc.strength }})
                                </div>
                            </template>

                            <template v-else-if="post.kind === 'action'">
                                <div class="post-author">
                                    {{ post.character_name || post.user_username }}
                                    <span class="post-meta">действие</span>
                                </div>
                                <div class="post-content action-content">{{ post.content }}</div>
                                <div v-if="post.action_data" class="action-detail" :class="{ success: post.action_data.success, fail: !post.action_data.success }">
                                    Цель: {{ post.action_data.target_name }} · сила {{ post.action_data.target_strength }}
                                    · <span class="action-result">{{ post.action_data.success ? 'успех' : 'провал' }}</span>
                                </div>
                            </template>

                            <template v-else>
                                <div class="post-author">
                                    {{ post.character_name || post.user_username }}
                                </div>
                                <div class="post-content">{{ post.content }}</div>
                            </template>
                        </div>
                    </div>

                    <!-- Форма ввода -->
                    <div class="composer">
                        <div v-if="ws.error.value" class="error-inline">
                            ⚠ {{ ws.error.value }}
                        </div>
                        <div v-else-if="ws.lastError.value" class="error-inline">
                            ⚠ {{ ws.lastError.value }}
                        </div>

                        <div v-if="game.status !== 'active'" class="composer-disabled">
                            <template v-if="game.status === 'pending'">Игра не запущена</template>
                            <template v-else-if="game.status === 'ended'">Игра завершена</template>
                            <template v-else>Ввод недоступен (статус: {{ game.status }})</template>
                        </div>

                        <template v-else-if="myRole === 'spectator'">
                            <div class="composer-disabled">Вы наблюдатель — без права писать</div>
                        </template>

                        <template v-else-if="!myCharacterId && !game.is_master">
                            <div class="composer-disabled">
                                У вас нет персонажа в этой игре.
                            </div>
                        </template>

                        <template v-else>
                            <div class="composer-tabs">
                                <button
                                    v-if="myCharacterId"
                                    class="composer-tab"
                                    :class="{ active: mode === 'chat' }"
                                    @click="mode = 'chat'"
                                >Реплика</button>
                                <button
                                    v-if="myCharacterId"
                                    class="composer-tab"
                                    :class="{ active: mode === 'action' }"
                                    @click="mode = 'action'"
                                >Действие</button>
                                <button
                                    v-if="game.is_master"
                                    class="composer-tab"
                                    :class="{ active: mode === 'event' }"
                                    @click="mode = 'event'"
                                >Событие <span class="tab-hint">(мастер)</span></button>
                            </div>

                            <div v-if="mode === 'action'" class="action-fields">
                                <div class="action-target-toggle">
                                    <label class="radio-item">
                                        <input v-model="actionTargetKind" type="radio" value="none" />
                                        <span>Без цели</span>
                                    </label>
                                    <label class="radio-item">
                                        <input v-model="actionTargetKind" type="radio" value="npc" />
                                        <span>Против NPC</span>
                                    </label>
                                    <label class="radio-item">
                                        <input v-model="actionTargetKind" type="radio" value="character" />
                                        <span>Против игрока</span>
                                    </label>
                                </div>
                                <div v-if="actionTargetKind === 'npc'" class="action-npc-row">
                                    <input v-model="npcTarget.name" type="text" placeholder="Имя цели (Волк)" />
                                    <input v-model.number="npcTarget.strength" type="number" min="1" max="20" placeholder="Сила" />
                                </div>
                                <div v-if="actionTargetKind === 'character'" class="action-npc-row">
                                    <select v-model="charTargetId" class="select">
                                        <option :value="null" disabled>Выберите цель</option>
                                        <option
                                            v-for="p in playerTargets"
                                            :key="p.id"
                                            :value="p.character_id"
                                        >{{ p.character_name }} (сила {{ p.character_strength }})</option>
                                    </select>
                                </div>
                            </div>

                            <div v-if="mode === 'event'" class="action-fields">
                                <p class="event-hint">Опционально — добавить NPC, против которого игроки потом могут действовать:</p>
                                <div class="action-npc-row">
                                    <input v-model="eventNpc.name" type="text" placeholder="Имя NPC (например, Волк)" />
                                    <input v-model.number="eventNpc.strength" type="number" min="1" max="20" placeholder="Сила" />
                                </div>
                            </div>

                            <div class="composer-row">
                                <textarea
                                    v-model="text"
                                    :placeholder="placeholderForMode"
                                    rows="2"
                                    @keydown.enter.exact.prevent="submit"
                                ></textarea>
                                <button class="btn" @click="submit" :disabled="!canSubmit">Отправить</button>
                            </div>
                        </template>
                    </div>
                </main>
            </div>
        </template>

        <div v-else class="cont loading-state">{{ gamesStore.error || 'Игра не найдена' }}</div>
    </div>
</template>

<script setup lang="ts">
import { useGamesStore } from '~/stores/useGamesStore'
import { useUserStore } from '~/stores/useUserStore'
import { useCharactersStore } from '~/stores/useCharactersStore'
import { useGameWS } from '~/composables/useGameWS'
import type { GameStatus, ParticipantRole } from '~/types'

definePageMeta({ layout: 'main' })

const route = useRoute()
const gameId = Number(route.params.id)

const gamesStore = useGamesStore()
const userStore = useUserStore()
const charactersStore = useCharactersStore()

const game = computed(() => gamesStore.currentGame)
const gameLoaded = ref(false)

// WS — будет реально подключён только если я участник
const ws = useGameWS(gameId)
const online = computed(() => ws.online.value)

// === ЯВЛЯЮСЬ ЛИ Я УЧАСТНИКОМ ===
const amParticipant = computed(() => {
    if (!userStore.me || !game.value) return false
    return game.value.participants.some(p => p.user_id === userStore.me!.id)
})

const masterName = computed(() => {
    if (!game.value) return '?'
    const gm = game.value.participants.find(p => p.role === 'gm')
    return gm?.username || 'мастер'
})

const hasCharacters = computed(() => charactersStore.characters.length > 0)

// === статус соединения ===
const connectionStatus = computed<'connecting' | 'online' | 'offline' | null>(() => {
    if (!gameLoaded.value || !game.value || !amParticipant.value) return null
    if (ws.connected.value) return 'online'
    if (game.value.status === 'ended') return null
    return 'offline'
})
const connectionStatusLabel = computed(() => {
    if (connectionStatus.value === 'online') return '● онлайн'
    if (connectionStatus.value === 'offline') return '○ нет связи'
    return ''
})

// composer
const mode = ref<'chat' | 'action' | 'event'>('chat')
const text = ref('')
const actionTargetKind = ref<'none' | 'npc' | 'character'>('none')
const npcTarget = reactive({ name: '', strength: 10 })
const charTargetId = ref<number | null>(null)
const eventNpc = reactive({ name: '', strength: 10 })

const myRole = computed<ParticipantRole | null>(() => {
    if (!userStore.me || !game.value) return null
    const me = game.value.participants.find(p => p.user_id === userStore.me!.id)
    return me?.role || null
})
const myCharacterId = computed<number | null>(() => {
    if (!userStore.me || !game.value) return null
    const me = game.value.participants.find(p => p.user_id === userStore.me!.id)
    return me?.character_id ?? null
})

const playerTargets = computed(() => {
    if (!game.value) return []
    return game.value.participants.filter(
        p => p.user_id !== userStore.me?.id
            && p.role !== 'spectator'
            && p.character_id !== null,
    )
})

const placeholderForMode = computed(() => {
    if (mode.value === 'chat') return 'Что говорит ваш персонаж?'
    if (mode.value === 'action') return 'Опишите действие'
    return 'Опишите событие в мире игры'
})

const canSubmit = computed(() => {
    if (!text.value.trim()) return false
    if (mode.value !== 'event' && !myCharacterId.value) return false
    if (mode.value === 'action' && actionTargetKind.value === 'character' && !charTargetId.value) return false
    if (mode.value === 'action' && actionTargetKind.value === 'npc' && !npcTarget.name.trim()) return false
    return true
})

// Если открыли страницу мастером, по умолчанию режим event активный
watch(game, (g) => {
    if (g?.is_master && !myCharacterId.value) {
        mode.value = 'event'
    }
}, { immediate: true })

// Копирование invite_code
const copied = ref(false)
function copyInvite() {
    if (!game.value) return
    try {
        navigator.clipboard.writeText(game.value.invite_code)
        copied.value = true
        setTimeout(() => copied.value = false, 1500)
    } catch {
        // ignore
    }
}

// автоскролл
const feedRef = ref<HTMLElement | null>(null)
watch(() => ws.posts.value.length, () => {
    nextTick(() => {
        if (feedRef.value) feedRef.value.scrollTop = feedRef.value.scrollHeight
    })
})

async function onStart() {
    if (!game.value) return
    const updated = await gamesStore.start(game.value.id)
    if (updated) await gamesStore.fetchById(game.value.id)
}
async function onEnd() {
    if (!game.value || !confirm('Завершить игру? Это действие нельзя отменить.')) return
    ws.endGame()
    await gamesStore.end(game.value.id)
    await gamesStore.fetchById(game.value.id)
}

function submit() {
    if (!canSubmit.value) return
    const content = text.value.trim()
    if (mode.value === 'chat') {
        ws.sendChat(content, myCharacterId.value!)
    } else if (mode.value === 'action') {
        if (actionTargetKind.value === 'npc') {
            ws.sendAction(content, myCharacterId.value!, {
                kind: 'npc',
                name: npcTarget.name.trim(),
                strength: npcTarget.strength,
            })
        } else if (actionTargetKind.value === 'character') {
            ws.sendAction(content, myCharacterId.value!, {
                kind: 'character',
                id: charTargetId.value!,
            })
        } else {
            ws.sendAction(content, myCharacterId.value!)
        }
    } else if (mode.value === 'event') {
        const npc = eventNpc.name.trim()
            ? { name: eventNpc.name.trim(), strength: eventNpc.strength }
            : undefined
        ws.sendEvent(content, npc)
    }
    text.value = ''
}

// Загрузка
onMounted(async () => {
    // Сначала убедимся, что есть данные пользователя — без них не сможем определить amParticipant
    if (!userStore.me) await userStore.fetchMe()
    await gamesStore.fetchById(gameId)
    if (!game.value) {
        gameLoaded.value = true
        return
    }

    // подгрузим персонажей (для UX заглушки на не-участника)
    charactersStore.fetchAll().catch(() => {})

    if (amParticipant.value) {
        const history = await gamesStore.fetchPosts(gameId)
        gameLoaded.value = true
        await ws.connect(history)
    } else {
        // НЕ участник — не подключаемся к WS, чтобы не получить close 4403 в консоль
        gameLoaded.value = true
    }
})

const STATUS_LABELS: Record<GameStatus, string> = {
    pending: 'Ожидает',
    active: 'Активна',
    paused: 'Пауза',
    ended: 'Завершена',
    abandoned: 'Брошена',
}
function statusLabel(s: GameStatus) { return STATUS_LABELS[s] || s }
</script>

<style scoped>
.room-page {
    background-color: #f4f4f5;
    min-height: calc(100vh - 8rem);
}
.loading-state {
    padding: 8rem 0;
    text-align: center;
    font-size: 1.6rem;
    color: #94a3b8;
}

/* Шапка */
.room-header {
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    padding: 2rem 0;
    position: sticky;
    top: 0;
    z-index: 10;
}
.room-header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}
.room-header-left { display: flex; align-items: center; gap: 1.6rem; }
.back-link { color: #0051a8; font-size: 1.4rem; text-decoration: none; }
.back-link:hover { text-decoration: underline; }
.room-title { font-size: 2.2rem; font-weight: 600; color: #0f172a; }
.status-badge {
    font-size: 1.1rem;
    padding: .4rem 1rem;
    border-radius: 2rem;
    font-weight: 500;
}
.status--active   { background: #dcfce7; color: #16a34a; }
.status--pending  { background: #dbeafe; color: #1d4ed8; }
.status--paused   { background: #fef3c7; color: #b45309; }
.status--ended,
.status--abandoned { background: #fee2e2; color: #dc2626; }

.room-header-right { display: flex; align-items: center; gap: 1.2rem; }
.invite-code-box {
    display: flex; align-items: center; gap: .6rem;
    background: #f1f5f9; padding: .6rem 1rem; border-radius: .6rem;
}
.invite-label { font-size: 1.2rem; color: #64748b; }
.invite-code { font-size: 1.4rem; color: #0051a8; font-family: ui-monospace, monospace; font-weight: 600; }
.btn-icon {
    background: none; border: none; cursor: pointer;
    color: #0051a8; font-size: 1.6rem; padding: 0 .4rem;
}

.btn { background: #0051a8; color: #fff; border: none; border-radius: .6rem;
    padding: 1rem 1.6rem; font-size: 1.4rem; cursor: pointer;
    font-family: inherit; text-transform: uppercase;
    text-decoration: none; display: inline-flex; align-items: center; }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.btn-sm { padding: .8rem 1.4rem; font-size: 1.3rem; }
.btn-danger { background: #dc2626; }
.btn-ghost {
    background-color: #fff;
    color: #0051a8;
    border: 1.5px solid #0051a8;
}

.conn-pill {
    font-size: 1.2rem;
    padding: .4rem .8rem;
    border-radius: 2rem;
    font-weight: 500;
}
.conn--online  { background: #dcfce7; color: #16a34a; }
.conn--offline { background: #fee2e2; color: #dc2626; }

/* Заглушка не-участника */
.not-participant {
    padding: 4rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 64rem;
}
.not-participant-card {
    text-align: center;
    padding: 4rem 3rem;
}
.not-participant-icon {
    font-size: 5rem;
    margin-bottom: 1rem;
}
.not-participant-title {
    font-size: 2.4rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 1rem;
}
.not-participant-text {
    font-size: 1.5rem;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 2.4rem;
}
.not-participant-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}
.participants-info-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 1.6rem;
    text-align: left;
}

/* Тело */
.room-body {
    display: grid;
    grid-template-columns: 26rem 1fr;
    gap: 2rem;
    padding: 2rem 0;
}
.card {
    background: #fff;
    border-radius: 1.2rem;
    padding: 2rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.sidebar { align-self: flex-start; position: sticky; top: 10rem; max-height: calc(100vh - 12rem); overflow-y: auto; }
.sidebar-title { font-size: 1.4rem; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 1.6rem; }
.participants-list { display: flex; flex-direction: column; gap: 1rem; }
.participant {
    display: flex; align-items: center; gap: 1rem;
    padding: .8rem; border-radius: .8rem;
    transition: background .15s;
}
.participant--gm { background: #fef9c3; }
.participant-avatar {
    width: 3.6rem; height: 3.6rem; border-radius: 50%;
    background: #0051a8; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; font-weight: 600;
    position: relative;
}
.participant--online .participant-avatar::after {
    content: '';
    position: absolute; bottom: 0; right: 0;
    width: 1rem; height: 1rem; border-radius: 50%;
    background: #16a34a; border: 2px solid #fff;
}
.participant-info { flex: 1; min-width: 0; }
.participant-name {
    display: flex; align-items: center; gap: .6rem;
    font-size: 1.4rem; color: #0f172a; font-weight: 500;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.role-badge {
    font-size: 1rem; padding: .2rem .6rem; border-radius: 1rem;
    background: #e2e8f0; color: #475569; text-transform: uppercase;
}
.role-badge.role--gm { background: #fbbf24; color: #78350f; }
.participant-char { font-size: 1.2rem; color: #64748b; margin-top: .2rem; }

/* Чат */
.chat-card { display: flex; flex-direction: column; padding: 0; min-height: 60rem; max-height: calc(100vh - 12rem); }
.chat-feed {
    flex: 1; overflow-y: auto;
    padding: 2rem;
    display: flex; flex-direction: column; gap: 1.4rem;
}
.empty-feed {
    color: #94a3b8;
    text-align: center;
    font-size: 1.4rem;
    padding: 4rem 2rem;
}

.post {
    background: #f8fafc;
    border-radius: 1rem;
    padding: 1.2rem 1.6rem;
}
.post-author {
    font-size: 1.2rem; color: #0051a8; font-weight: 600;
    margin-bottom: .4rem;
    display: flex; align-items: center; gap: .8rem;
}
.post-meta { color: #94a3b8; font-weight: 400; font-size: 1.1rem; }
.post-content { font-size: 1.5rem; color: #0f172a; line-height: 1.5; white-space: pre-wrap; }
.action-content { font-style: italic; color: #475569; }
.action-detail {
    margin-top: .8rem;
    font-size: 1.3rem;
    padding: .6rem 1rem;
    border-radius: .6rem;
}
.action-detail.success { background: #dcfce7; color: #166534; }
.action-detail.fail    { background: #fee2e2; color: #991b1b; }
.action-result { font-weight: 600; text-transform: uppercase; }

.post--event { background: #fffbeb; border-left: 3px solid #f59e0b; }
.event-author { color: #b45309; }
.event-content { font-weight: 500; color: #78350f; }
.event-npc {
    margin-top: .8rem; padding: .6rem 1rem;
    background: #fef3c7; border-radius: .6rem;
    font-size: 1.3rem; color: #78350f;
}

.post--system {
    background: transparent;
    padding: .4rem 0;
}
.system-line {
    text-align: center;
    color: #64748b;
    font-size: 1.3rem;
    display: inline-flex; align-items: center; gap: .6rem;
    margin: 0 auto;
    padding: .6rem 1.2rem;
    background: #f1f5f9;
    border-radius: 2rem;
}
.system-icon { font-size: 1.4rem; }

/* Composer */
.composer {
    border-top: 1px solid #e2e8f0;
    padding: 1.6rem 2rem;
    display: flex; flex-direction: column; gap: 1rem;
}
.composer-disabled {
    text-align: center;
    color: #94a3b8;
    font-size: 1.4rem;
    padding: 1rem;
}
.composer-tabs { display: flex; gap: 1rem; border-bottom: 1px solid #e2e8f0; }
.composer-tab {
    background: none; border: none;
    padding: .8rem 1.2rem;
    font-size: 1.3rem;
    color: #64748b;
    cursor: pointer;
    font-family: inherit;
    position: relative;
    transition: color .2s;
}
.composer-tab.active { color: #0051a8; font-weight: 600; }
.composer-tab.active::after {
    content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
    height: 2px; background: #0051a8;
}
.tab-hint { color: #94a3b8; font-weight: 400; font-size: 1.1rem; }

.action-fields { display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0; }
.action-target-toggle { display: flex; gap: 1.4rem; flex-wrap: wrap; }
.radio-item {
    display: flex; align-items: center; gap: .4rem;
    font-size: 1.3rem; color: #0f172a; cursor: pointer;
}
.radio-item input { width: auto; }
.action-npc-row {
    display: grid;
    grid-template-columns: 1fr 9rem;
    gap: 1rem;
}
.action-npc-row .select { grid-column: 1 / -1; }
.action-npc-row input, .action-npc-row .select {
    border: 1.5px solid #cbd5e1;
    border-radius: .6rem;
    padding: .8rem 1rem;
    font-size: 1.4rem;
    font-family: inherit;
    outline: none;
    background: #fff;
}
.action-npc-row input:focus, .action-npc-row .select:focus { border-color: #0051a8; }
.event-hint { font-size: 1.2rem; color: #94a3b8; margin: 0; }

.composer-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: end;
}
.composer-row textarea {
    border: 1.5px solid #cbd5e1;
    border-radius: .8rem;
    padding: 1rem 1.2rem;
    font-size: 1.5rem;
    font-family: inherit;
    outline: none;
    resize: vertical;
    min-height: 4.4rem;
    transition: border-color .2s;
}
.composer-row textarea:focus { border-color: #0051a8; }

.error-inline {
    background: #fee2e2;
    color: #991b1b;
    padding: .8rem 1rem;
    border-radius: .6rem;
    font-size: 1.3rem;
}
</style>