<template>
  <NuxtLink :to="`/characters/${char.id}`" class="char-card">
    <div class="char-img-wrap">
      <img src="/placeholder-avatar.png" :alt="char.name" class="char-img" />
      <div class="char-overlay">
        <span class="char-view">Смотреть</span>
      </div>
    </div>
    <div class="char-info">
      <p class="char-name">{{ char.name }}</p>
      <div class="char-stats" v-if="char.status">
        <span class="stat-badge">{{ char.status }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Character } from '../../types'

defineProps<{
  char: Character
}>()
</script>

<style scoped>
.char-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s;
}

.char-card:hover {
  transform: translateY(-4px);
}

.char-img-wrap {
  position: relative;
  width: 12rem;
  height: 12rem;
  border-radius: 1.2rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.char-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}

.char-card:hover .char-img {
  transform: scale(1.06);
}

.char-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 81, 168, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.char-card:hover .char-overlay {
  opacity: 1;
}

.char-view {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
}

.char-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.char-name {
  font-size: 1.4rem;
  color: #0f172a;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12rem;
}

.char-stats {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.stat-badge {
  font-size: 1.1rem;
  background: #e8f0fb;
  color: #0051a8;
  padding: 0.2rem 0.7rem;
  border-radius: 2rem;
}
</style>
