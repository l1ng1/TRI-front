<template>
    <header class="header">
        <div class="cont header__container">
            <div class="header__left">
                <NuxtLink to="/" class="logo">TRI</NuxtLink>
                <div class="search">
                    <span class="search__icon">🔍</span>
                    <input
                        v-model="searchQuery"
                        type="text"
                        class="search__input"
                        placeholder="Поиск игр, персонажей, людей..."
                        @keydown="navSearch"
                    >
                </div>
            </div>

            <div class="menu">
                <button class="icon-btn" title="Сообщения" @click="navigateTo('/messages')">
                    <img src="../icon/main/message-square.svg" alt="" class="icon-btn__img">
                </button>
                <button class="icon-btn" title="Уведомления" @click="navigateTo('/news')">
                    <span class="icon-btn__bell">🔔</span>
                    <span v-if="hasUnread" class="icon-btn__dot"></span>
                </button>

                <template v-if="userStore.isAuthenticated">
                    <NuxtLink :to="`/profile`" class="profile-link" title="Профиль">
                        <img v-if="userStore.me.avatar" :src="userStore.me.avatar" alt="" class="profile-link__img">
                        <span v-else class="profile-link__initial">{{ userStore.me.username[0].toUpperCase() }}</span>
                    </NuxtLink>
                    <button class="btn btn--ghost btn--sm" @click="onLogout">Выйти</button>
                </template>
                <template v-else>
                    <NuxtLink to="/login" class="btn btn--ghost btn--sm">Войти</NuxtLink>
                </template>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="cont main__container">
            <aside class="sidebar">
                <nav>
                    <ul class="sidebar__list">
                        <li v-for="(i, index) in tabs" :key="index" class="sidebar__item">
                            <NuxtLink :to="i.link" class="sidebar__link">
                                <span class="sidebar__icon">{{ i.icon }}</span>
                                <span>{{ i.name }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <section class="content">
                <slot></slot>
            </section>
        </div>
    </main>
</template>

<script setup>
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()
const router = useRouter()

const searchQuery = ref('')
const hasUnread = ref(false)

const tabs = reactive([
    { name: 'Новости',   link: '/news',     icon: '📰' },
    { name: 'Игры',      link: '/games',    icon: '🎲' },
    { name: 'Квесты',    link: '/quests',   icon: '⚔️' },
    { name: 'Сообщения', link: '/messages', icon: '💬' },
    { name: 'Жалобы',    link: '/errors',   icon: '⚠️' },
])

function navSearch(ev) {
    if (ev.code === 'Enter' && searchQuery.value.trim()) {
        navigateTo(`/games?q=${encodeURIComponent(searchQuery.value.trim())}`)
    }
}

async function onLogout() {
    await userStore.logout()
    await router.push('/')
}
</script>

<style scoped>
.cont {
    width: 1120px;
    margin: 0 auto;
}

/* ===== Шапка ===== */
.header {
    padding: 1.6rem 0;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
}
.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
}
.header__left {
    display: flex;
    align-items: center;
    gap: 3rem;
    flex: 1;
}
.logo {
    font-size: 3.6rem;
    color: var(--color-blue);
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.05em;
}

/* Поиск */
.search {
    flex: 1;
    max-width: 48rem;
    position: relative;
    display: flex;
    align-items: center;
}
.search__icon {
    position: absolute;
    left: 1.4rem;
    font-size: 1.6rem;
    color: var(--color-grey);
    pointer-events: none;
}
.search__input {
    width: 100%;
    height: 4rem;
    background-color: #F7F7F7;
    border: none;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
    border-radius: 2rem;
    padding: 0 1.6rem 0 4rem;
    font-size: 1.4rem;
    color: var(--color-dark);
    transition: box-shadow 0.2s;
}
.search__input:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-blue);
}
.search__input::placeholder {
    color: var(--color-grey);
}

/* Правая часть шапки */
.menu {
    display: flex;
    align-items: center;
    gap: 1.2rem;
}

.icon-btn {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    background-color: var(--color-blue);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: background-color 0.2s, transform 0.15s;
}
.icon-btn:hover {
    background-color: #003d7e;
    transform: translateY(-1px);
}
.icon-btn__img {
    width: 2rem;
    height: 2rem;
}
.icon-btn__bell {
    font-size: 1.8rem;
    filter: brightness(0) invert(1);
}
.icon-btn__dot {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #d32f2f;
    border: 2px solid #fff;
}

/* Профильный кружок */
.profile-link {
    width: 4.4rem;
    height: 4.4rem;
    border-radius: 50%;
    background-color: var(--color-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 600;
    overflow: hidden;
    transition: transform 0.15s;
}
.profile-link:hover {
    transform: translateY(-1px);
}
.profile-link__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.profile-link__initial {
    user-select: none;
}

/* Уменьшенная "ghost"-кнопка для шапки */
.btn--ghost {
    background-color: #fff;
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}
.btn--ghost:hover {
    background-color: var(--color-blue);
    color: #fff;
}
.btn--sm {
    padding: 0.8rem 1.4rem;
    font-size: 1.3rem;
}

/* ===== Main ===== */
.main {
    padding: 3rem 0 6rem;
    min-height: calc(100vh - 8rem);
    background-color: #FAFBFC;
}
.main__container {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
}

/* Сайдбар */
.sidebar {
    width: 26rem;
    flex-shrink: 0;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1.6rem 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 9rem;
}
.sidebar__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
.sidebar__link {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    padding: 1.2rem 2rem;
    text-decoration: none;
    color: var(--color-dark);
    font-size: 1.5rem;
    border-left: 3px solid transparent;
    transition: background-color 0.15s, border-color 0.15s, color 0.15s, padding-left 0.15s;
}
.sidebar__link:hover {
    background-color: #F0F4FA;
    color: var(--color-blue);
    padding-left: 2.4rem;
}
.sidebar__icon {
    font-size: 1.8rem;
    width: 2.4rem;
    text-align: center;
}

/* Активный пункт сайдбара */
.sidebar__link.router-link-active {
    background-color: #F0F4FA;
    color: var(--color-blue);
    border-left-color: var(--color-blue);
    font-weight: 500;
}

/* Контентная область */
.content {
    flex: 1;
    min-width: 0;
    background-color: #fff;
    border-radius: 1rem;
    padding: 2.4rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    min-height: 60rem;
}
</style>
