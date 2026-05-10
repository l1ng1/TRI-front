<template>
    <div class="form-page">
        <div class="cont form-content">
            <NuxtLink to="/games" class="back-link">← К списку игр</NuxtLink>

            <div class="card form-card">
                <h1 class="card-title">Создать игру</h1>
                <p class="card-subtitle">Вы автоматически становитесь мастером этой игры</p>

                <form @submit.prevent="onSubmit" class="form">
                    <label class="form-label">
                        <span>Название</span>
                        <input v-model="form.title" type="text" maxlength="50" required
                            placeholder="Тени забытого королевства" />
                    </label>

                    <label class="form-label">
                        <span>Описание</span>
                        <textarea v-model="form.about" rows="3"
                            placeholder="Что ждёт игроков?"></textarea>
                    </label>

                    <label class="form-label">
                        <span>Правила</span>
                        <textarea v-model="form.rules" rows="3"
                            placeholder="Особые правила, ограничения"></textarea>
                    </label>

                    <label class="form-label">
                        <span>Максимум игроков</span>
                        <input v-model.number="form.max_players" type="number" min="1" max="100" required />
                    </label>

                    <p v-if="error" class="error-text">{{ error }}</p>

                    <div class="form-actions">
                        <button class="btn" :disabled="submitting" type="submit">
                            {{ submitting ? 'Создаём...' : 'Создать игру' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGamesStore } from '~/stores/useGamesStore'

definePageMeta({ layout: 'main' })

const gamesStore = useGamesStore()
const router = useRouter()

const form = reactive({
    title: '',
    about: '',
    rules: '',
    max_players: 4,
})
const submitting = ref(false)
const error = ref<string | null>(null)

async function onSubmit() {
    if (form.title.trim().length < 1) {
        error.value = 'Введите название'
        return
    }
    submitting.value = true
    error.value = null
    const game = await gamesStore.create({
        title: form.title.trim(),
        about: form.about.trim(),
        rules: form.rules.trim(),
        max_players: form.max_players,
    })
    submitting.value = false
    if (game) {
        await router.push(`/games/${game.id}`)
    } else {
        error.value = gamesStore.error || 'Не удалось создать игру'
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
.form-label input, .form-label textarea {
    width: 100%;
    border: 1.5px solid #cbd5e1;
    border-radius: .8rem;
    padding: 1.2rem;
    font-size: 1.5rem;
    color: #0f172a;
    font-family: inherit;
    outline: none;
    transition: border-color .2s;
    resize: vertical;
}
.form-label input:focus, .form-label textarea:focus { border-color: #0051a8; }

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
