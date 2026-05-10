<template>
    <div class="form-page">
        <div class="cont form-content">
            <NuxtLink to="/profile" class="back-link">← В профиль</NuxtLink>

            <div class="card form-card">
                <h1 class="card-title">Новый персонаж</h1>
                <p class="card-subtitle">Создайте персонажа, с которым будете участвовать в играх</p>

                <form @submit.prevent="submitForm" class="form">
                    <label class="form-label">
                        <span>Имя персонажа</span>
                        <input v-model="form.name" type="text" minlength="3" maxlength="50" required
                            placeholder="От 3 до 50 символов" />
                    </label>

                    <label class="form-label">
                        <span>Описание</span>
                        <textarea v-model="form.about" rows="4"
                            placeholder="Кто этот персонаж? Какова его история?"></textarea>
                    </label>

                    <div class="strength-section">
                        <label class="form-label">
                            <span>Сила <span class="strength-value">{{ form.strength }}</span></span>
                            <input v-model.number="form.strength" type="range" min="1" max="20" class="range" />
                            <div class="range-labels">
                                <span>слабак (1)</span>
                                <span>середняк (10)</span>
                                <span>титан (20)</span>
                            </div>
                        </label>
                        <p class="strength-hint">
                            От силы зависит, удадутся ли вашему персонажу действия:
                            ваша сила должна быть не меньше силы цели, чтобы её одолеть.
                        </p>
                    </div>

                    <p v-if="message" :class="{ 'success-text': isSuccess, 'error-text': !isSuccess }">
                        {{ message }}
                    </p>

                    <div class="form-actions">
                        <button type="submit" class="btn" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Создаём...' : 'Создать персонажа' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCharactersStore } from '~/stores/useCharactersStore'

definePageMeta({ layout: 'main' })

const router = useRouter()
const store = useCharactersStore()

const form = reactive({
    name: '',
    about: '',
    strength: 10,
})

const isSubmitting = ref(false)
const message = ref('')
const isSuccess = ref(false)

async function submitForm() {
    if (form.name.trim().length < 3) {
        message.value = 'Имя должно быть не менее 3 символов'
        isSuccess.value = false
        return
    }

    isSubmitting.value = true
    message.value = ''
    isSuccess.value = false

    try {
        await store.create({
            name: form.name.trim(),
            about: form.about.trim(),
            strength: form.strength,
        })

        isSuccess.value = true
        message.value = 'Персонаж успешно создан!'
        setTimeout(() => router.push('/profile'), 1200)
    } catch (error) {
        isSuccess.value = false
        message.value = 'Ошибка при создании персонажа. Попробуйте позже.'
        console.error(error)
    } finally {
        isSubmitting.value = false
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
.form-label input[type="text"], .form-label textarea {
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

.strength-section {
    display: flex; flex-direction: column; gap: 1rem;
    background: #f8fafc;
    border-radius: 1rem;
    padding: 1.6rem;
}
.strength-value {
    background: #0051a8;
    color: #fff;
    padding: .2rem 1rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 600;
    margin-left: .5rem;
}
.range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: .8rem;
    background: #cbd5e1;
    border-radius: .4rem;
    outline: none;
}
.range::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 2.4rem; height: 2.4rem;
    background: #0051a8; border-radius: 50%; cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px #0051a8;
}
.range::-moz-range-thumb {
    width: 2.4rem; height: 2.4rem;
    background: #0051a8; border-radius: 50%; cursor: pointer;
    border: 3px solid #fff;
    box-shadow: 0 0 0 1px #0051a8;
}
.range-labels {
    display: flex; justify-content: space-between;
    font-size: 1.1rem; color: #94a3b8;
}
.strength-hint {
    font-size: 1.3rem; color: #64748b;
    line-height: 1.5; margin-top: .4rem;
}

.success-text {
    color: #16a34a;
    background: #dcfce7;
    padding: 1rem 1.2rem;
    border-radius: .6rem;
    font-size: 1.4rem;
    font-weight: 500;
}
.error-text {
    color: #dc2626;
    background: #fee2e2;
    padding: 1rem 1.2rem;
    border-radius: .6rem;
    font-size: 1.4rem;
}

.form-actions { display: flex; justify-content: flex-end; }
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
