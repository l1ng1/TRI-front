<template>
    <form>
        <div>
            <h3>Вход</h3>
            <input type="text" placeholder="Имя">
            <input type="text" placeholder="Логин">
            <input type="password" placeholder="Пароль">
            <input type="password" placeholder="Повторите пароль">
        </div>
        <button>Войти</button>
    </form>
</template>

<script setup>
definePageMeta({
    layout: 'auth',
})

</script>