<template>
    <section class="character">
        <img class="Icon" :src = "CharExample.icon" alt="">
        <div class="characterWrapper">
            <p>Имя персонажа: {{CharExample.name}}</p>
            <p>Описание: {{CharExample.description}}</p>
            <p>Автор: {{ UserExample.userName }}</p>

            <p>Характеристики</p>
            <ul class="statsList">
                <li class="stat" v-for = "(value, key) in CharExample.stats">
                    {{key}}: {{ value }}
                </li>
            </ul>

            <p>квесты/игры</p>
            <ul class="gamesList">
                <li class="game" v-for = "Game in CharExample.games">
                    {{Game.gameName}}
                </li>
            </ul>
            <button class="change">Редактировать</button>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { CharExample } from '~/data/characters';
    import { UserExample } from '~/data/user';
    import { GAMES } from '~/data/games';
</script>

<style scoped>

    .character {
        display: flex;
        align-items: flex-start;
        gap: 75px
    }

    ul {
        padding-inline-start: 0px;
        list-style: None
    }

    .Icon {
        margin-top: 16px;
        border-radius: 50%;
        border: solid black;
        width: 200px;
        aspect-ratio: 1;
    }
    
    p {
        max-width: 770px;
    }
</style>