<template>

    <div class="games">
        <gameComp v-for="game in gamesStore.games" :key="game.id" :game="game"></gameComp>
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
:root {
  --color-blue:   #0051A8;
  --color-light:  #FFFFFF;
  --color-dark:   #0F121A;
  --color-grey:   #989AA4;
  --color-bg:     #f9fafc;
  --color-card:   #ffffff;
  --color-border: #e0e4ed;

  --radius:       0.8rem;
  --border:       1px solid var(--color-border);
}

* {
  box-sizing: border-box;
}

.game-layout {
  height: 100vh;
  display: grid;
  grid-template-columns: 320px 1fr;
  background: var(--color-bg);
  font-family: 'ABeeZee', system-ui, sans-serif;
  color: var(--color-dark);
  overflow: hidden;
}

.sidebar {
  background: var(--color-card);
  border-right: var(--border);
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.8rem;
}

.sidebar__header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-bottom: 1.8rem;
  border-bottom: var(--border);
}

.game-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: var(--border);
}

.game-title {
  font-size: 2.1rem;
  margin: 0;
  line-height: 1.15;
  font-weight: 700;
}
</style>
