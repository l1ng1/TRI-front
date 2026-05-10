<template>

<div class="game">
    <div class="game-header">
        <img src="/placeholder-game.png">
        <div class="game-name">
            <h3>Название игры: {{ props.game.title }}</h3>
            <p>Статус игры: {{ props.game.status }}</p>
        </div>
    </div>
    <h3 class="game-description">
        Описание игры:
        <p>
            {{ props.game.about }}
        </p>
    </h3>
    <div class="line"></div>
    <p>Участников: {{ props.game.players_name.length }}</p>
</div>

</template>

<script setup lang="ts">
import type { Game } from '../../types'

const props = defineProps<{
    game: Game,
}>()
</script>

<style scoped>
.game{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px black solid;
    padding: 5px;
    margin-bottom: 10px;
}
.game-header{
    display: flex;
    gap: 10px 20px;
}
.game-header img{
    width: 10%;
    object-fit: cover;
    border-radius: 100px;
}
</style>
