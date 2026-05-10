<template>
    <div class="games-page">
        <div class="cont games-content">
            <div class="page-header">
                <h1 class="page-title">Игры</h1>
                <div class="header-actions">
                    <NuxtLink to="/games/join" class="btn btn-ghost">Войти по коду</NuxtLink>
                    <NuxtLink to="/games/new" class="btn">+ Создать игру</NuxtLink>
                </div>
            </div>

            <nav class="tabs">
                <button
                    class="tab-btn"
                    :class="{ active: activeTab === 'all' }"
                    @click="activeTab = 'all'"
                >Все игры</button>
                <button
                    class="tab-btn"
                    :class="{ active: activeTab === 'my' }"
                    @click="activeTab = 'my'"
                >Мои игры ({{ myGames.length }})</button>
            </nav>

            <div v-if="loading" class="empty-text">Загрузка...</div>

            <div v-else-if="visibleGames.length" class="games-grid">
                <NuxtLink
                    v-for="game in visibleGames"
                    :key="game.id"
                    :to="`/games/${game.id}`"
                    class="card game-card"
                >
                    <div class="game-card-header">
                        <h3 class="game-card-title">{{ game.title }}</h3>
                        <span class="status-badge" :class="`status--${game.status}`">
                            {{ statusLabel(game.status) }}
                        </span>
                    </div>
                    <p class="game-card-about">{{ game.about || 'Без описания' }}</p>
                    <div class="game-card-meta">
                        <span>👥 {{ game.participants_count }} / {{ game.max_players }}</span>
                        <span class="meta-date">{{ formatDate(game.created_at) }}</span>
                    </div>
                </NuxtLink>
            </div>

            <p v-else class="empty-text">
                <template v-if="activeTab === 'my'">
                    Вы пока не участвуете ни в одной игре.
                    <NuxtLink to="/games/join" class="link">Войти по коду</NuxtLink>
                    или
                    <NuxtLink to="/games/new" class="link">создать свою</NuxtLink>.
                </template>
                <template v-else>Открытых игр пока нет.</template>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGamesStore } from '~/stores/useGamesStore'
import type { GameStatus } from '~/types'

definePageMeta({ layout: 'main' })

const gamesStore = useGamesStore()
const activeTab = ref<'all' | 'my'>('all')

const loading = computed(() => gamesStore.loading)
const allGames = computed(() => gamesStore.games)
const myGames = computed(() => gamesStore.myGames)
const visibleGames = computed(() => activeTab.value === 'my' ? myGames.value : allGames.value)

onMounted(async () => {
    await Promise.all([gamesStore.fetchAll(), gamesStore.fetchMy()])
})

const STATUS_LABELS: Record<GameStatus, string> = {
    pending: 'Ожидает',
    active: 'Активна',
    paused: 'Пауза',
    ended: 'Завершена',
    abandoned: 'Брошена',
}

function statusLabel(s: GameStatus) {
    return STATUS_LABELS[s] || s
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('ru-RU', {
        day: 'numeric', month: 'short', year: 'numeric',
    })
}
</script>

<style scoped>
.games-page {
    background-color: #f4f4f5;
    min-height: calc(100vh - 8rem);
    padding: 4rem 0 6rem;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
}
.page-title {
    font-size: 3.6rem;
    color: #0051a8;
}
.header-actions {
    display: flex;
    gap: 1.2rem;
}
.btn {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-family: inherit;
}
.btn-ghost {
    background-color: #fff;
    color: #0051a8;
    border: 1.5px solid #0051a8;
    padding: 1.2rem 1.8rem;
    border-radius: .7rem;
    font-size: 1.4rem;
    text-transform: uppercase;
}
.btn-ghost:hover { background-color: #f0f4f8; }

.tabs {
    display: flex;
    border-bottom: 2px solid #e2e8f0;
    margin-bottom: 3rem;
}
.tab-btn {
    background: none;
    border: none;
    padding: 1.4rem 2rem;
    font-size: 1.6rem;
    color: #64748b;
    cursor: pointer;
    position: relative;
    font-family: inherit;
    transition: color .2s;
}
.tab-btn::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0; right: 0;
    height: 2px;
    background: #0051a8;
    transform: scaleX(0);
    transition: transform .2s;
}
.tab-btn.active {
    color: #0051a8;
    font-weight: 600;
}
.tab-btn.active::after { transform: scaleX(1); }
.tab-btn:hover { color: #0051a8; }

.games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
    gap: 2rem;
}

.card {
    background: #fff;
    border-radius: 1.2rem;
    padding: 2.4rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    text-decoration: none;
    color: inherit;
    transition: transform .15s, box-shadow .15s;
}
.game-card { display: flex; flex-direction: column; gap: 1rem; }
.game-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 81, 168, 0.15);
}

.game-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}
.game-card-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.3;
}
.game-card-about {
    font-size: 1.4rem;
    color: #64748b;
    line-height: 1.5;
    flex: 1;
    /* обрезаем длинное описание */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.game-card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
    color: #94a3b8;
    margin-top: .5rem;
}
.meta-date { font-size: 1.2rem; }

.status-badge {
    font-size: 1.1rem;
    padding: .4rem 1rem;
    border-radius: 2rem;
    font-weight: 500;
    flex-shrink: 0;
    white-space: nowrap;
}
.status--active   { background: #dcfce7; color: #16a34a; }
.status--pending  { background: #dbeafe; color: #1d4ed8; }
.status--paused   { background: #fef3c7; color: #b45309; }
.status--ended,
.status--abandoned { background: #fee2e2; color: #dc2626; }

.empty-text {
    font-size: 1.6rem;
    color: #94a3b8;
    text-align: center;
    padding: 6rem 0;
    line-height: 1.6;
}
.link { color: #0051a8; text-decoration: underline; }
</style>
