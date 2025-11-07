<template>
    <form>
        <div>
            <h3>Вход</h3>
            <input type="text" placeholder="Логин">
            <input type="password" placeholder="Пароль">
        </div>
        <button>Войти</button>
    </form>
</template>

<script setup>
definePageMeta({
    layout: 'auth',
})

</script>