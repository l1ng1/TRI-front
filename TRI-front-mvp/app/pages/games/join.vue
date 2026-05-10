<template>
    <div class="form-page">
        <div class="cont form-content">
            <NuxtLink to="/games" class="back-link">← К списку игр</NuxtLink>

            <div class="card form-card">
                <h1 class="card-title">Присоединиться к игре</h1>
                <p class="card-subtitle">Введите код приглашения, который дал мастер</p>

                <form @submit.prevent="onSubmit" class="form">
                    <label class="form-label">
                        <span>Код приглашения</span>
                        <input v-model="form.invite_code" type="text" required
                            placeholder="Например: Q9tRFxtmhm" />
                    </label>

                    <div class="form-label">
                        <span>Роль</span>
                        <div class="radio-group">
                            <label class="radio-item">
                                <input v-model="form.role" type="radio" value="player" />
                                <span>Игрок</span>
                            </label>
                            <label class="radio-item">
                                <input v-model="form.role" type="radio" value="spectator" />
                                <span>Наблюдатель</span>
                            </label>
                        </div>
                    </div>

                    <label class="form-label" v-if="form.role === 'player'">
                        <span>Персонаж</span>
                        <select v-model="form.character_id" required class="select">
                            <option :value="null" disabled>Выберите персонажа</option>
                            <option v-for="ch in myCharacters" :key="ch.id" :value="ch.id">
                                {{ ch.name }} (сила {{ ch.strength }})
                            </option>
                        </select>
                        <p v-if="!myCharacters.length" class="hint">
                            У вас нет персонажей.
                            <NuxtLink to="/characters/charForm" class="link">Создать</NuxtLink>
                        </p>
                    </label>

                    <p v-if="error" class="error-text">{{ error }}</p>

                    <div class="form-actions">
                        <button class="btn" :disabled="submitting" type="submit">
                            {{ submitting ? 'Заходим...' : 'Войти в игру' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGamesStore } from '~/stores/useGamesStore'
import { useCharactersStore } from '~/stores/useCharactersStore'

definePageMeta({ layout: 'main' })

const gamesStore = useGamesStore()
const charsStore = useCharactersStore()
const router = useRouter()

const form = reactive({
    invite_code: '',
    role: 'player' as 'player' | 'spectator',
    character_id: null as number | null,
})
const submitting = ref(false)
const error = ref<string | null>(null)

const myCharacters = computed(() => charsStore.characters)

onMounted(async () => {
    await charsStore.fetchAll()
})

async function onSubmit() {
    error.value = null
    if (!form.invite_code.trim()) {
        error.value = 'Введите код приглашения'
        return
    }
    if (form.role === 'player' && !form.character_id) {
        error.value = 'Выберите персонажа'
        return
    }
    submitting.value = true
    const game = await gamesStore.joinByCode(
        form.invite_code.trim(),
        form.role === 'player' ? form.character_id : null,
        form.role,
    )
    submitting.value = false
    if (game) {
        await router.push(`/games/${game.id}`)
    } else {
        error.value = gamesStore.error || 'Не удалось присоединиться'
    }
}
</script>

<style scoped>
.form-page {
    background-color: #f4f4f5;
    min-height: calc(100vh - 8rem);
    padding: 4rem 0 6rem;
}
.form-content { max-width: 64rem; }
.back-link {
    display: inline-block;
    color: #0051a8;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    text-decoration: none;
}
.back-link:hover { text-decoration: underline; }

.card {
    background: #fff;
    border-radius: 1.2rem;
    padding: 3.2rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}
.card-title {
    font-size: 2.4rem;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: .8rem;
}
.card-subtitle {
    font-size: 1.4rem;
    color: #64748b;
    margin-bottom: 3rem;
}

.form { display: flex; flex-direction: column; gap: 2rem; }
.form-label { display: flex; flex-direction: column; gap: .8rem; font-size: 1.4rem; color: #475569; }
.form-label input, .form-label textarea, .select {
    width: 100%;
    border: 1.5px solid #cbd5e1;
    border-radius: .8rem;
    padding: 1.2rem;
    font-size: 1.5rem;
    color: #0f172a;
    font-family: inherit;
    outline: none;
    transition: border-color .2s;
    background: #fff;
}
.form-label input:focus, .form-label textarea:focus, .select:focus { border-color: #0051a8; }

.radio-group { display: flex; gap: 2rem; }
.radio-item {
    display: flex;
    align-items: center;
    gap: .6rem;
    font-size: 1.5rem;
    color: #0f172a;
    cursor: pointer;
}
.radio-item input { width: auto; margin: 0; }

.hint {
    font-size: 1.3rem;
    color: #94a3b8;
    margin-top: .5rem;
}
.link { color: #0051a8; text-decoration: underline; }

.error-text {
    color: #dc2626;
    font-size: 1.4rem;
    background: #fee2e2;
    padding: 1rem 1.2rem;
    border-radius: .6rem;
}
.form-actions { display: flex; justify-content: flex-end; margin-top: 1rem; }
.btn {
    background: #0051a8;
    color: #fff;
    border: none;
    border-radius: .7rem;
    padding: 1.2rem 2.4rem;
    text-transform: uppercase;
    font-size: 1.4rem;
    cursor: pointer;
    font-family: inherit;
}
.btn:disabled { opacity: .6; cursor: not-allowed; }
</style>
