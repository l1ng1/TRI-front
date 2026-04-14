<template>
  <div class="profile-header">
    <div class="banner">
      <div class="banner-grid"></div>
    </div>

    <div class="header-body cont">
      <div class="left">
        <div class="avatar-wrap">
          <img class="avatar" src="/placeholder-avatar.png" :alt="user.username" />
          <span class="rank-badge">⭐ Новичок</span>
        </div>
        <div class="user-meta">
          <h1 class="username">{{ user.username }}</h1>
          <p class="user-email">{{ user.email }}</p>
          <div class="socials">
            <a href="#" class="social-link">
              <img src="../../icon/footer-networks/vk.svg" alt="VK" class="social-icon" />
            </a>
            <a href="#" class="social-link">
              <img src="../../icon/footer-networks/Telegram.svg" alt="Telegram" class="social-icon" />
            </a>
            <a href="#" class="social-link">
              <img src="../../icon/footer-networks/mail.svg" alt="Mail" class="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div class="header-actions">
        <button v-if="isOwn" class="btn btn-outline" @click="$emit('edit')">
          Редактировать профиль
        </button>
        <template v-else>
          <button class="btn">Добавить в друзья</button>
          <NuxtLink :to="`/messages`" class="btn btn-outline btn-msg">Написать</NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '../../types'

defineProps<{
  user: User
  isOwn: boolean
}>()

defineEmits<{
  edit: []
}>()
</script>

<style scoped>
.profile-header {
  margin-bottom: 3rem;
}

.banner {
  background: linear-gradient(135deg, #003f85 0%, #0051a8 50%, #1a6fc4 100%);
  height: 18rem;
  position: relative;
  overflow: hidden;
}

.banner-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 40px 40px;
}

.header-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 2rem;
  transform: translateY(-5rem);
}

.left {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: block;
}

.rank-badge {
  position: absolute;
  bottom: 0.4rem;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #0051a8;
  font-size: 1.1rem;
  padding: 0.3rem 1rem;
  border-radius: 2rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
}

.user-meta {
  padding-bottom: 0.5rem;
}

.username {
  font-size: 3.2rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0.4rem;
}

.user-email {
  font-size: 1.4rem;
  color: #989aa4;
  margin-bottom: 1.2rem;
}

.socials {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: #f0f4f8;
  transition: background 0.2s, transform 0.2s;
}

.social-link:hover {
  background: #dde8f5;
  transform: translateY(-2px);
}

.social-icon {
  width: 1.8rem;
  height: 1.8rem;
}

.header-actions {
  display: flex;
  gap: 1.2rem;
  align-items: center;
  padding-bottom: 0.5rem;
}

.btn-outline {
  background-color: transparent;
  color: #0051a8;
  border: 2px solid #0051a8;
}

.btn-outline:hover {
  background-color: #f0f4f8;
}

.btn-msg {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
</style>
