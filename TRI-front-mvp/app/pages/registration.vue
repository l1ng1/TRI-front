<template>
    <form class="login" @submit.prevent="onSubmit">
        <h2 class="login__title">Регистрация</h2>
        <div class="login__inputs-box">
            <label class="login__label">
                Логин
                <input v-model="username" type="text" class="login__input" autocomplete="username" required>
            </label>
            <label class="login__label">
                Пароль
                <input v-model="password" type="password" class="login__input" autocomplete="new-password" required>
            </label>
            <label class="login__label">
                Повторите пароль
                <input v-model="passwordConfirm" type="password" class="login__input" autocomplete="new-password" required>
            </label>
        </div>

        <p v-if="userStore.authError" class="login__error">{{ userStore.authError }}</p>

        <button class="btn login__btn" :disabled="userStore.authLoading" type="submit">
            {{ userStore.authLoading ? 'Регистрируем...' : 'Зарегистрироваться' }}
        </button>
        <p class="login__text">
            Уже есть аккаунт?
            <NuxtLink to="/login" class="login__link">Войти</NuxtLink>
        </p>
    </form>
</template>

<script setup>
import { useUserStore } from '~/stores/useUserStore'

definePageMeta({ layout: 'auth' })

const userStore = useUserStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')

async function onSubmit() {
    const ok = await userStore.register(username.value, password.value, passwordConfirm.value)
    if (ok) await router.push('/')
}
</script>

<style scoped>
.login { margin-bottom: 3rem; }
.login__inputs-box {
    display: flex; flex-direction: column;
    margin-bottom: 4.5rem; gap: 3rem;
}
.login__label {
    color: var(--color-grey); font-size: 1.2rem; text-align: start;
}
.login__input {
    width: 100%; height: 4rem;
    background-color: #F7F7F7; border: none;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    border-radius: .5rem; padding: 0 1rem; font-size: 1.6rem;
}
.login__input:focus { outline: 2px solid var(--color-blue); }
.login__title {
    font-size: 2.4rem; color: var(--color-blue); margin-bottom: 6rem;
}
.login__text { color: var(--color-grey); font-size: 1.4rem; }
.login__link { color: var(--color-blue); text-decoration: underline; }
.login__btn {
    font-size: 2rem; padding: 1rem 2.3rem;
    text-transform: capitalize; margin-bottom: 1.5rem; cursor: pointer;
}
.login__btn:disabled { opacity: 0.6; cursor: not-allowed; }
.login__error {
    color: #d32f2f; font-size: 1.4rem;
    margin-bottom: 1.5rem; text-align: left; line-height: 1.4;
}
</style>
