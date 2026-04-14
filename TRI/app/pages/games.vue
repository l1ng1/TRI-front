<template>

<div class="cont">
    <gameSearchComp></gameSearchComp>

    <div class="games">
        <gameComp v-for="game in gamesStore.games" :key="game.id" :game="game"></gameComp>
    </div>
</div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGamesStore } from '../stores/useGamesStore'
import GameSearchComp from '~/components/gameComp/gameSearchComp.vue';
import GameComp from '~/components/gameComp/gameComp.vue';



const gamesStore = useGamesStore()

onMounted(() => gamesStore.fetchAll())
</script>

<style scoped>
.cont{
    display: flex;
    width: 100%;
    flex-direction: column;
}

.games{
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
