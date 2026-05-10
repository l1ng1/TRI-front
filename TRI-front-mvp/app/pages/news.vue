<template>
  <section class="news-feed">
    <div class="cont">
      <h1 class="feed-title">Новости платформы</h1>

      <div class="feed-controls">
        <input
          type="text"
          class="search-field"
          placeholder="Поиск по новостям, обновлениям, событиям..."
        />

        <div class="tag-filters">
          <button
            v-for="tag in tags"
            :key="tag"
            class="tag-btn"
            :class="{ 'tag-btn--active': activeTag === tag }"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div class="posts-list">
        <article v-for="post in visiblePosts" :key="post.id" class="post-card">
          <div class="post-header">
            <span class="post-category">{{ post.category }}</span>
            <time class="post-date">{{ post.date }}</time>
          </div>

          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-lead">{{ post.lead }}</p>

          <div class="post-tags">
            <span v-for="t in post.tags" :key="t" class="post-tag">{{ t }}</span>
          </div>

          <a href="#" class="read-more">Читать полностью →</a>
        </article>
      </div>

      <div class="load-more-wrapper">
        <button class="btn load-more-btn">Показать ещё</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTag = ref('Все')

const tags = ['Все', 'Игры', 'Обновления', 'События', 'Гайды', 'Полки']

const posts = ref([
  {
    id: 1,
    title: 'Запущен новый сезон «Тени Забытого Королевства»',
    lead: 'Новые локации, более 20 персонажей, масштабный сюжетный ивент и бонусы для первых участников. Ждём вас в игре!',
    date: '17 марта 2026',
    category: 'Обновления',
    tags: ['Игры', 'Новости'],
  },
  {
    id: 2,
    title: 'Итоги весеннего турнира по ролевым дуэлям',
    lead: 'Победители получили уникальные артефакты и место в рейтинге. Смотрите лучшие моменты и поздравления от команды.',
    date: '10 марта 2026',
    category: 'События',
    tags: ['События', 'Новости'],
  },
  {
    id: 3,
    title: 'Как создать стильную полку персонажа в 2026 году',
    lead: 'Обновлённый гид: актуальные тренды, новые шаблоны, советы по оформлению и секреты от топовых авторов.',
    date: '5 марта 2026',
    category: 'Гайды',
    tags: ['Полки', 'Гайды'],
  },
  {
    id: 4,
    title: 'Улучшения чата и системы уведомлений',
    lead: 'Быстрые действия, ускоренная загрузка сообщений, поддержка ночного режима и исправление мелких недочётов.',
    date: '28 февраля 2026',
    category: 'Обновления',
    tags: ['Обновления', 'Новости'],
  },
])

const visiblePosts = computed(() => {
  if (activeTag.value === 'Все') return posts.value
  return posts.value.filter(p => p.tags.includes(activeTag.value) || p.category === activeTag.value)
})
</script>

<style scoped>
.news-feed {
  padding: 6rem 0 10rem;
  background: #f9fbff;
  color: #0f121a;
  min-height: 100vh;
}

.feed-title {
  font-size: 4.4rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 4.5rem;
  color: #0a0e1a;
  letter-spacing: -0.6px;
}

.feed-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4.5rem;
}

.search-field {
  width: 100%;
  max-width: 620px;
  padding: 1.5rem 2.2rem;
  border: 1px solid #d8e0f0;
  border-radius: 1.2rem;
  background: white;
  font-size: 1.7rem;
  box-shadow: 0 2px 12px rgba(0, 81, 168, 0.06);
  transition: all 0.22s;
}

.search-field:focus {
  outline: none;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 4px rgba(0, 81, 168, 0.12);
}

.tag-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}

.tag-btn {
  padding: 0.95rem 2rem;
  background: white;
  border: 1px solid #d8e0f0;
  border-radius: 3rem;
  color: #4a5568;
  font-size: 1.45rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag-btn:hover {
  background: #f0f4ff;
  border-color: #c3d6ff;
}

.tag-btn--active {
  background: var(--color-blue);
  color: white;
  border-color: var(--color-blue);
  box-shadow: 0 3px 12px rgba(0, 81, 168, 0.18);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  max-width: 920px;
  margin: 0 auto;
}

.post-card {
  background: white;
  border-radius: 1.4rem;
  padding: 2.6rem 3rem;
  border: 1px solid #e5edff;
  transition: all 0.24s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.08);
  border-color: #c3d6ff;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
  color: #64748b;
}

.post-category {
  color: var(--color-blue);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.post-title {
  font-size: 2.7rem;
  font-weight: 700;
  margin: 0 0 1.2rem;
  line-height: 1.24;
  color: #0f172a;
}

.post-lead {
  font-size: 1.65rem;
  line-height: 1.62;
  color: #475569;
  margin: 0 0 2rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.post-tag {
  padding: 0.6rem 1.4rem;
  background: #f1f5f9;
  border-radius: 2.5rem;
  font-size: 1.35rem;
  color: #64748b;
}

.read-more {
  color: var(--color-blue);
  font-weight: 600;
  font-size: 1.55rem;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: #00438f;
  text-decoration: underline;
}

.load-more-wrapper {
  text-align: center;
  margin-top: 6rem;
}

.btn {
  background: var(--color-blue);
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 1.6rem 5.5rem;
  font-size: 1.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: #00438f;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 81, 168, 0.22);
}
</style>