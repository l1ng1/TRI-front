<template>
    <section class="userProfile">
        <img class="Icon" :src = "UserExample.userIcon" alt="">
        <div class="userProfileWrapper">
            <p>Имя пользователя: {{UserExample.userName}}</p>
            <p>Почта: {{UserExample.userEmail}}</p>
            <p>Тип профиля: {{UserExample.userType}}</p>
            <p>Описание: {{UserExample.userDesc}}</p>

            <p>Любимые жанры</p>
            <ul class="genresList">
                <li class="genre" v-for = "Genre in UserExample.userFavGenres">
                    {{Genre.name}}
                </li>
            </ul>

            <p>Нелюбимые жанры</p>
            <ul class="genresList">
                <li class="genre" v-for = "Genre in UserExample.userUnfavGenres">
                    {{Genre.name}}
                </li>
            </ul>

            <p>Избранные квесты/игры</p>
            <ul class="gamesList">
                <li class="game" v-for = "Game in UserExample.userFavGames">
                    {{Game.gameName}}
                </li>
            </ul>

            <p>Персонажи</p>
            <CharList :link="character.link" :list="UserExample.userCharList" />
            <button class="change">Редактировать</button>
        </div>
    </section>
</template>

<script setup lang="ts">
    import {UserExample} from '~/data/user';
    import { CharExample } from '~/data/characters';
    import charList from '~/components/charComp/charList.vue';
import CharList from '~/components/charComp/charList.vue';

    const character = reactive({
        name: CharExample.name,
        link: '/characters'
    })
</script>

<style scoped>
    .userProfile {
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

    .genresList {
        display: flex;
        gap: 30px
    }

    .genre {
        background-color: grey;
        padding: 3px 7px
    }

    .gamesList {
        display: flex;
        flex-direction: column;
        gap: 16px
    }

    .game {
        width: fit-content;
        background-color: grey;
        padding: 3px 7px
    }
</style>