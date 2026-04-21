<template>
  <div class="game-layout">
    <!-- Левая панель – фиксированная, без скролла -->
    <aside class="sidebar">
      <div class="sidebar__header">
        <img :src="currentGame.gameIcon" alt="Иконка" class="game-icon" />
        <div class="game-info">
          <h1 class="game-title">{{ currentGame.gameName }}</h1>
          <p class="game-author">Автор #{{ currentGame.gameAuthorId }}</p>
        </div>
      </div>

      <div class="sidebar-block participants-block">
        <h3>Участники · {{ currentGame.gameFollowers }}</h3>
        <div class="participants">
          <div v-for="p in participants" :key="p.id" class="player-item">
            <img :src="p.avatar" alt="" class="avatar" />
            <div class="player-info">
              <div class="player-name">{{ p.name }}</div>
              <div class="player-status" :class="p.statusClass">{{ p.status }}</div>
            </div>
          </div>
        </div>
      </div>

<<<<<<< feat16
      <div class="sidebar-block npcs-block">
        <h3>НПС / ключевые персонажи</h3>
        <div class="npcs">
          <div v-for="npc in npcs" :key="npc.id" class="npc-item">
            <img :src="npc.avatar" alt="" class="avatar npc-avatar" />
            <div class="npc-info">
              <div class="npc-name">{{ npc.name }}</div>
              <div class="npc-role">{{ npc.role }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="btn btn--outline">Покинуть игру</button>
        <button class="btn">Настройки</button>
      </div>
    </aside>

    <!-- Правая часть – чат и ввод -->
    <main class="game-area">
      <header class="game-header">
        <h2>Сцена: {{ currentScene }}</h2>
        <div class="game-meta">
          <span>Ход: {{ currentTurn }}</span>
          <span>{{ gameTime }}</span>
        </div>
      </header>

      <div class="chat-window" ref="chatRef">
        <div v-for="(msg, i) in messages" :key="i" class="msg" :class="msg.type">
          <div v-if="msg.type !== 'system'" class="msg-avatar">
            <img :src="msg.avatar" alt="" />
          </div>

          <div class="msg-body">
            <div v-if="msg.type !== 'system'" class="msg-header">
              <span class="msg-author">{{ msg.author }}</span>
              <time class="msg-time">{{ msg.time }}</time>
            </div>

            <div class="msg-text" v-html="msg.text"></div>
=======
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

>>>>>>> main

            <div v-if="msg.actions?.length" class="msg-actions">
              <button
                v-for="(act, idx) in msg.actions"
                :key="idx"
                class="btn btn--small action-btn"
              >
                {{ act.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="input-zone">
        <textarea
          v-model="messageText"
          placeholder="Ваше действие / речь / мысль..."
          @keydown.enter.exact.prevent="sendMessage"
          rows="2"
        ></textarea>
        <button class="btn btn--send" @click="sendMessage" :disabled="!messageText.trim()">
          Отправить
        </button>
      </div>
    </main>
  </div>
</template>

<<<<<<< feat16
<script setup>
import { ref } from 'vue'

// Данные оставляем минимальными, чтобы помещалось
const currentGame = ref({
  gameName: 'Тени Забытого Королевства',
  gameIcon: 'https://via.placeholder.com/64/0051A8/fff?text=T',
  gameAuthorId: 5421,
  gameFollowers: 12,
})

const currentScene = ref('Подножие старой башни')
const currentTurn  = ref('Аэлира → Мастер')
const gameTime     = ref('Ночь, 03:41')

const participants = ref([
  { id:1, name:'Аэлира',   avatar:'https://via.placeholder.com/40', status:'онлайн',     statusClass:'status-online'  },
  { id:2, name:'Торин',     avatar:'https://via.placeholder.com/40', status:'пишет...',   statusClass:'status-writing' },
  { id:3, name:'Мастер',    avatar:'https://via.placeholder.com/40', status:'ГМ',         statusClass:'status-gm'      },
])

const npcs = ref([
  { id:1, name:'Страж башни', avatar:'https://via.placeholder.com/40/444', role:'противник'   },
  { id:2, name:'Лесной дух',  avatar:'https://via.placeholder.com/40/666', role:'нейтральный' },
])

const messages = ref([
  { type:'system', text:'Начало сцены: Подножие старой башни', time:'03:22' },
  { type:'player', author:'Аэлира', avatar:'https://via.placeholder.com/40', text:'Подхожу ближе, лук наготове…', time:'03:24' },
  { type:'gm',     author:'Мастер', avatar:'https://via.placeholder.com/40', text:'Из тени выступает фигура в плаще.<br>«Назовись, или пожалеешь»', time:'03:26', actions:[
    { label:'Представиться', value:'introduce' },
    { label:'Атаковать',     value:'attack'    },
    { label:'Отступить',     value:'retreat'   },
  ]},
])

const messageText = ref('')

function sendMessage() {
  if (!messageText.value.trim()) return
  // в демо просто добавляем – без скролла вниз, т.к. страница статичная
  messages.value.push({
    type: 'player',
    author: 'Вы',
    avatar: 'https://via.placeholder.com/40',
    text: messageText.value,
    time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
  })
  messageText.value = ''
}
=======
const gamesStore = useGamesStore()

onMounted(() => gamesStore.fetchAll())
>>>>>>> main
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
<<<<<<< feat16

.game-author {
  margin: 0.3rem 0 0;
  font-size: 1.35rem;
  color: var(--color-grey);
}

.sidebar-block {
  margin: 2rem 0;
}

.sidebar-block h3 {
  margin: 0 0 1.1rem;
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--color-blue);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.participants, .npcs {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.player-item, .npc-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-radius: var(--radius);
  transition: all 0.14s ease;
}

.player-item:hover, .npc-item:hover {
  background: #f0f4ff;
  transform: translateX(2px);
}

.avatar, .npc-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: var(--border);
}

.player-name, .npc-name {
  font-size: 1.45rem;
  font-weight: 600;
}

.player-status, .npc-role {
  font-size: 1.25rem;
  color: var(--color-grey);
}

.status-online  { color: #2e7d32; }
.status-writing { color: #f57c00; }
.status-gm      { color: #c62828; font-style: italic; }

.sidebar-footer {
  margin-top: auto;
  display: flex;
  gap: 1rem;
  padding-top: 1.6rem;
}

/* ─────────────── Правая часть ─────────────── */
.game-area {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.game-header {
  padding: 1.8rem 2.4rem;
  border-bottom: var(--border);
  background: var(--color-card);
  flex-shrink: 0;
}

.game-header h2 {
  margin: 0 0 0.6rem;
  font-size: 2.4rem;
  font-weight: 700;
}

.game-meta {
  display: flex;
  gap: 2.2rem;
  color: var(--color-grey);
  font-size: 1.35rem;
}

.chat-window {
  flex: 1;
  padding: 1.8rem 2.4rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  background: #f9fafc;
}

.msg {
  display: flex;
  gap: 1.2rem;
  max-width: 80%;
}

.msg.system {
  align-self: center;
  font-style: italic;
  color: #6b7280;
  text-align: center;
  background: #e5e7eb;
  padding: 0.9rem 1.6rem;
  border-radius: var(--radius);
  font-size: 1.35rem;
}

.msg-avatar img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
}

.msg-body {
  flex: 1;
}

.msg-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.3rem;
}

.msg-author {
  font-weight: 600;
  font-size: 1.45rem;
}

.msg-time {
  font-size: 1.2rem;
  color: #9ca3af;
}

.msg-text {
  background: var(--color-card);
  padding: 1.1rem 1.5rem;
  border-radius: var(--radius);
  border: var(--border);
  line-height: 1.5;
  font-size: 1.45rem;
}

.msg.player .msg-text {
  background: var(--color-blue);
  color: white;
  border-top-left-radius: var(--radius);
  border-top-right-radius: 0;
}

.msg-actions {
  margin-top: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.action-btn {
  padding: 0.7rem 1.4rem;
  font-size: 1.3rem;
  min-width: 110px;
}

.input-zone {
  flex-shrink: 0;
  display: flex;
  padding: 1.4rem 2.4rem;
  border-top: var(--border);
  background: var(--color-card);
  gap: 1.2rem;
}

.input-zone textarea {
  flex: 1;
  padding: 1.1rem 1.5rem;
  border: var(--border);
  border-radius: var(--radius);
  font-size: 1.45rem;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
}

.btn {
  background: var(--color-blue);
  color: white;
  border: none;
  border-radius: var(--radius);
  padding: 1.3rem 2.4rem;
  font-size: 1.45rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.16s;
}

.btn:hover {
  background: #00438f;
}

.btn--outline {
  background: transparent;
  border: 1.5px solid var(--color-blue);
  color: var(--color-blue);
}

.btn--outline:hover {
  background: rgba(0, 81, 168, 0.06);
}

.btn--send {
  padding: 1.3rem 3.2rem;
}
</style>
=======
</style>
>>>>>>> main
