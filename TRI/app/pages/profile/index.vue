<template>
  <div class="profile-page">
    <ProfileHeader v-if="currentUser" :user="currentUser" :isOwn="true" @edit="editMode = !editMode" />

    <div class="cont profile-content">

      <!-- Tabs -->
      <nav class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>

      <!-- О себе -->
      <section v-if="activeTab === 'about'" class="tab-panel">
        <div class="card about-card">
          <div class="card-header">
            <h2 class="card-title">О себе</h2>
            <button v-if="!editMode" class="btn-text" @click="editMode = true">Изменить</button>
            <div v-else class="edit-actions">
              <button class="btn btn-sm" @click="saveAbout">Сохранить</button>
              <button class="btn-text btn-cancel" @click="editMode = false">Отмена</button>
            </div>
          </div>
          <p v-if="!editMode" class="about-text">
            {{ aboutText || 'Расскажите о себе...' }}
          </p>
          <textarea
            v-else
            v-model="aboutText"
            class="about-textarea"
            placeholder="Расскажите о себе..."
            rows="5"
          ></textarea>
        </div>

        <div class="card settings-card">
          <h2 class="card-title">Настройки профиля</h2>
          <div class="setting-row">
            <label class="setting-label" for="type-profile">Видимость профиля</label>
            <select class="select" id="type-profile" v-model="profileVisibility">
              <option value="open">Открытый</option>
              <option value="friends">Только для друзей</option>
              <option value="close">Закрытый</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Персонажи -->
      <section v-if="activeTab === 'characters'" class="tab-panel">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Мои персонажи</h2>
            <NuxtLink to="/characters/charForm" class="btn btn-sm">+ Создать</NuxtLink>
          </div>
          <div v-if="myCharacters.length" class="char-grid">
            <ProfileCharCard
              v-for="(char, i) in myCharacters"
              :key="char.id ?? i"
              :char="char"
            />
          </div>
          <p v-else class="empty-text">Персонажей ещё нет</p>
        </div>
      </section>

      <!-- Игры -->
      <section v-if="activeTab === 'games'" class="tab-panel">
        <div class="card">
          <h2 class="card-title" style="margin-bottom: 2rem">Мои игры</h2>
          <div v-if="myGames.length" class="game-list">
            <div
              v-for="game in myGames"
              :key="game.id"
              class="game-row"
            >
              <img src="/placeholder-game.png" :alt="game.title" class="game-icon" />
              <div class="game-info">
                <p class="game-name">{{ game.title }}</p>
                <p class="game-desc">{{ game.about }}</p>
              </div>
              <span class="status-badge" :class="['ended','abandoned'].includes(game.status) ? 'status--closed' : 'status--open'">
                {{ game.status }}
              </span>
            </div>
          </div>
          <p v-else class="empty-text">Нет игр</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Character, Game } from '../../types'
import { useUserStore } from '../../stores/useUserStore'
import { useCharactersStore } from '../../stores/useCharactersStore'
import { useGamesStore } from '../../stores/useGamesStore'

definePageMeta({
  layout: 'main'
})

const userStore = useUserStore()
const charactersStore = useCharactersStore()
const gamesStore = useGamesStore()

const activeTab = ref<'about' | 'characters' | 'games'>('about')
const editMode = ref(false)
const aboutText = ref('')
const profileVisibility = ref('open')

const currentUser = computed(() => userStore.currentUser)

const myCharacters = computed(() =>
  currentUser.value
    ? charactersStore.characters.filter((c: Character) => c.owners_name === currentUser.value!.username)
    : []
)

const myGames = computed(() =>
  currentUser.value
    ? gamesStore.games.filter((g: Game) => g.players_name.includes(currentUser.value!.username))
    : []
)

type TabId = 'about' | 'characters' | 'games'

const tabs = computed(() => [
  { id: 'about' as TabId, label: 'О себе' },
  { id: 'characters' as TabId, label: `Персонажи (${myCharacters.value.length})` },
  { id: 'games' as TabId, label: `Игры (${myGames.value.length})` },
])

onMounted(async () => {
  await Promise.all([
    userStore.fetchById(1),
    charactersStore.fetchAll(),
    gamesStore.fetchAll(),
  ])
})

function saveAbout() {
  editMode.value = false
}
</script>

<style scoped>
.profile-page {
  background-color: #f4f4f5;
  min-height: 100vh;
}

.profile-content {
  padding-bottom: 6rem;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 3rem;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1.4rem 2rem;
  font-size: 1.6rem;
  color: #64748b;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  font-family: inherit;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #0051a8;
  transform: scaleX(0);
  transition: transform 0.2s;
}

.tab-btn.active {
  color: #0051a8;
  font-weight: 600;
}

.tab-btn.active::after {
  transform: scaleX(1);
}

.tab-btn:hover {
  color: #0051a8;
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: #fff;
  border-radius: 1.2rem;
  padding: 2.4rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
}

.card-title {
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
}

.about-text {
  font-size: 1.6rem;
  color: #475569;
  line-height: 1.7;
}

.about-textarea {
  width: 100%;
  border: 1.5px solid #cbd5e1;
  border-radius: 0.8rem;
  padding: 1.2rem;
  font-size: 1.6rem;
  color: #475569;
  resize: vertical;
  line-height: 1.6;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.about-textarea:focus {
  border-color: #0051a8;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-label {
  font-size: 1.6rem;
  color: #475569;
}

.select {
  border: 1.5px solid #cbd5e1;
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  color: #0051a8;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  min-width: 22rem;
}

.char-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.game-row {
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.2rem;
  border-radius: 1rem;
  background: #f8fafc;
  transition: background 0.15s;
}

.game-row:hover {
  background: #f0f4f8;
}

.game-icon {
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 0.8rem;
  object-fit: cover;
  flex-shrink: 0;
}

.game-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.game-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #0f172a;
}

.game-desc {
  font-size: 1.3rem;
  color: #94a3b8;
}

.status-badge {
  font-size: 1.2rem;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  font-weight: 500;
  flex-shrink: 0;
}

.status--open {
  background: #dcfce7;
  color: #16a34a;
}

.status--closed {
  background: #fee2e2;
  color: #dc2626;
}

.btn-sm {
  padding: 0.8rem 1.6rem;
  font-size: 1.4rem;
}

.btn-text {
  background: none;
  border: none;
  color: #0051a8;
  font-size: 1.4rem;
  cursor: pointer;
  font-family: inherit;
}

.btn-text:hover {
  text-decoration: underline;
}

.btn-cancel {
  color: #94a3b8;
}

.edit-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.empty-text {
  font-size: 1.6rem;
  color: #94a3b8;
  text-align: center;
  padding: 3rem 0;
}
</style>
