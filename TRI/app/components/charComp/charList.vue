<template>
    <ul class="charList">
                <li v-for = "Char in props.list">
                    <Nuxt-link :to="props.link">
                        <img class="charImg" :src = "Char.icon">
                    </Nuxt-link>
                    
                </li>
            </ul>
</template>

<script setup lang="ts">
    import type { Character } from '~/data/characters';

    const props = defineProps<{
        list: Array<Character>,
        link: string
    }>()
</script>

<style scoped>
    .charList {
        display: flex;
        align-items: flex-start;
        gap: 30px;
    }

    .charImg {
        border-radius: 50%;
        object-fit: cover;
        border: solid black;
        width: 150px;
        aspect-ratio: 1;
    }
</style>