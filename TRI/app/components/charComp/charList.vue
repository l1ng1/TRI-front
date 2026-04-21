<template>
    <ul class="char-list">
        <li v-for="char in store.characters" :key="char.id" class="char-item">
            <NuxtLink :to="`/characters/${char.id}`">
                <img class="char-img" src="/placeholder-avatar.png" :alt="char.name || 'Character icon'" />
            </NuxtLink>
        </li>
        <NuxtLink to="/characters/charForm">Создать</NuxtLink>
    </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharactersStore } from '../../stores/useCharactersStore'

const store = useCharactersStore()

onMounted(async () => {
    try {
        await store.fetchAll()
    } catch (err) {
        console.error('Ошибка загрузки персонажей:', err)
    }
})
</script>

<style scoped>
.char-list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 30px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.char-item {
    list-style: none;
}

.char-img {
    width: 150px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #000;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.char-img:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
