<template>
  <!-- HERO -->
  <section class="hero">
    <div class="hero__bg-grid"></div>
    <div class="hero__bg-circle hero__bg-circle--1"></div>
    <div class="hero__bg-circle hero__bg-circle--2"></div>
    <div class="cont hero__content">
      <div class="hero__text">
        <span class="hero__label">Платформа ТРИ</span>
        <h1 class="hero__title">Место, где&nbsp;рождаются&nbsp;истории</h1>
        <p class="hero__sub">Создавай текстовые ролевые игры, находи игроков и&nbsp;погружайся в&nbsp;миры, придуманные такими же, как ты.</p>
        <div class="hero__actions">
          <NuxtLink to="/registration" class="btn hero__btn-main">Начать бесплатно</NuxtLink>
          <NuxtLink to="/games" class="hero__btn-ghost">Посмотреть игры →</NuxtLink>
        </div>
      </div>
      <div class="hero__card-preview">
        <div class="preview-card">
          <div class="preview-card__top">
            <div class="preview-avatar"></div>
            <div>
              <div class="preview-line preview-line--name"></div>
              <div class="preview-line preview-line--sub"></div>
            </div>
          </div>
          <div class="preview-line preview-line--full"></div>
          <div class="preview-line preview-line--full"></div>
          <div class="preview-line preview-line--half"></div>
          <div class="preview-tags">
            <span class="preview-tag">Фэнтези</span>
            <span class="preview-tag">Приключения</span>
            <span class="preview-tag">Открытый мир</span>
          </div>
        </div>
        <div class="preview-card preview-card--behind"></div>
      </div>
    </div>

    <div class="hero__stats cont">
      <div class="stat-item">
        <span class="stat-num">1 200+</span>
        <span class="stat-label">активных игр</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">8 000+</span>
        <span class="stat-label">игроков</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-num">0 ₽</span>
        <span class="stat-label">навсегда бесплатно</span>
      </div>
    </div>
  </section>

  <!-- ДЛЯ КОГО -->
  <section class="for-who">
    <div class="cont">
      <div class="section-header">
        <span class="section-tag">Аудитория</span>
        <h2 class="section-title">Для кого платформа</h2>
      </div>
      <div class="for-who__cards">
        <div class="fw-card">
          <div class="fw-card__num">01</div>
          <h3 class="fw-card__title">Гейм-мастера</h3>
          <p class="fw-card__desc">Создавай игры с широким набором инструментов. Находи активных игроков и управляй своим миром.</p>
        </div>
        <div class="fw-card fw-card--featured">
          <div class="fw-card__num">02</div>
          <h3 class="fw-card__title">Игроки</h3>
          <p class="fw-card__desc">Большой выбор активных игр и удобный поиск — найдёшь что-то по душе среди сотен миров.</p>
        </div>
        <div class="fw-card">
          <div class="fw-card__num">03</div>
          <h3 class="fw-card__title">Писатели</h3>
          <p class="fw-card__desc">Заяви о себе в ролевом сообществе. Публикуй работы и получай признание.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ПОЧЕМУ МЫ -->
  <section class="advantages">
    <div class="cont">
      <div class="section-header">
        <span class="section-tag">Преимущества</span>
        <h2 class="section-title">Почему ТРИ</h2>
      </div>
      <div class="adv-grid">
        <div class="adv-card" v-for="adv in advantages" :key="adv.title">
          <div class="adv-card__icon">
            <img :src="adv.icon" :alt="adv.title" />
          </div>
          <h3 class="adv-card__title">{{ adv.title }}</h3>
          <p class="adv-card__desc">{{ adv.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta">
    <div class="cont cta__inner">
      <div class="cta__bg-grid"></div>
      <h2 class="cta__title">Готов начать свою историю?</h2>
      <p class="cta__sub">Регистрация бесплатна и занимает меньше минуты.</p>
      <NuxtLink to="/registration" class="btn cta__btn">Зарегистрироваться</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'first-page'
})

const advantages = [
  {
    icon: '/icon/advantage/Friends.svg',
    title: 'Найдите своих людей',
    desc: 'Знакомьтесь с игроками, которые разделяют ваши увлечения. Добавляйте в друзья, общайтесь, делитесь мемами.',
  },
  {
    icon: '/icon/advantage/Free.svg',
    title: 'Никакой платы',
    desc: 'Просто заведите аккаунт — и играйте в своё удовольствие. Навсегда бесплатно.',
  },
  {
    icon: '/icon/advantage/gamepad.svg',
    title: 'Инструменты игры',
    desc: 'Интерактивные карты, виртуальные кубики, ленты новостей — всё для живого игрового мира.',
  },
  {
    icon: '/icon/advantage/world.svg',
    title: 'С любого устройства',
    desc: 'Браузер на компьютере или смартфон в дороге — ваш мир всегда с вами.',
  },
  {
    icon: '/icon/advantage/Notification.svg',
    title: 'Объявления',
    desc: 'Не можете найти игру? Создайте объявление — отклики не заставят ждать.',
  },
]
</script>

<style scoped>
/* ─── HERO ─────────────────────────────────────────── */
.hero {
  background-color: #0051a8;
  position: relative;
  overflow: hidden;
  padding-bottom: 0;
}

.hero__bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.hero__bg-circle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero__bg-circle--1 {
  width: 60rem;
  height: 60rem;
  background: radial-gradient(circle, rgba(255,255,255,.07) 0%, transparent 70%);
  top: -15rem;
  right: -10rem;
}
.hero__bg-circle--2 {
  width: 40rem;
  height: 40rem;
  background: radial-gradient(circle, rgba(0,0,0,.12) 0%, transparent 70%);
  bottom: -10rem;
  left: -5rem;
}

.hero__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
  padding-top: 8rem;
  padding-bottom: 6rem;
  position: relative;
}

.hero__text {
  max-width: 55rem;
}

.hero__label {
  display: inline-block;
  background: rgba(255,255,255,.15);
  color: rgba(255,255,255,.9);
  font-size: 1.3rem;
  padding: .5rem 1.4rem;
  border-radius: 2rem;
  margin-bottom: 2rem;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.hero__title {
  font-size: 5.6rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.hero__sub {
  font-size: 1.8rem;
  color: rgba(255,255,255,.8);
  line-height: 1.6;
  margin-bottom: 3.5rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 2.4rem;
}

.hero__btn-main {
  font-size: 1.6rem;
  padding: 1.4rem 3rem;
  background: #fff;
  color: #0051a8;
  text-decoration: none;
  border-radius: .7rem;
  font-weight: 600;
  transition: transform .15s, box-shadow .15s;
}
.hero__btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}

.hero__btn-ghost {
  font-size: 1.6rem;
  color: rgba(255,255,255,.85);
  text-decoration: none;
  transition: color .15s;
}
.hero__btn-ghost:hover {
  color: #fff;
}

/* Preview card */
.hero__card-preview {
  position: relative;
  flex-shrink: 0;
}

.preview-card {
  background: #fff;
  border-radius: 1.6rem;
  padding: 2.4rem;
  width: 32rem;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
  position: relative;
  z-index: 2;
}

.preview-card--behind {
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  width: 100%;
  height: 100%;
  background: rgba(255,255,255,.2);
  z-index: 1;
  border-radius: 1.6rem;
}

.preview-card__top {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
}

.preview-avatar {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  flex-shrink: 0;
}

.preview-line {
  height: 1rem;
  border-radius: .5rem;
  background: #e2e8f0;
  margin-bottom: .8rem;
}
.preview-line--name { width: 12rem; background: #cbd5e1; }
.preview-line--sub  { width: 8rem; margin-bottom: 0; }
.preview-line--full { width: 100%; }
.preview-line--half { width: 60%; }

.preview-tags {
  display: flex;
  gap: .6rem;
  flex-wrap: wrap;
  margin-top: 1.4rem;
}

.preview-tag {
  background: #e8f0fb;
  color: #0051a8;
  font-size: 1.1rem;
  padding: .3rem .9rem;
  border-radius: 2rem;
}

/* Stats bar */
.hero__stats {
  display: flex;
  align-items: center;
  gap: 4rem;
  background: rgba(0,0,0,.2);
  border-radius: 1.2rem 1.2rem 0 0;
  padding: 2rem 3rem;
  position: relative;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: .3rem;
}

.stat-num {
  font-size: 2.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.stat-label {
  font-size: 1.3rem;
  color: rgba(255,255,255,.65);
}

.stat-divider {
  width: 1px;
  height: 4rem;
  background: rgba(255,255,255,.2);
}

/* ─── FOR WHO ───────────────────────────────────────── */
.for-who {
  padding: 10rem 0;
  background: #fff;
}

.section-header {
  margin-bottom: 5rem;
}

.section-tag {
  display: inline-block;
  color: #0051a8;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .08em;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 4.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
}

.for-who__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
}

.fw-card {
  border: 1.5px solid #e2e8f0;
  border-radius: 1.6rem;
  padding: 3.2rem 2.8rem;
  transition: box-shadow .2s, transform .2s;
}

.fw-card:hover {
  box-shadow: 0 8px 32px rgba(0,81,168,.1);
  transform: translateY(-4px);
}

.fw-card--featured {
  background: #0051a8;
  border-color: #0051a8;
}

.fw-card--featured .fw-card__num,
.fw-card--featured .fw-card__title,
.fw-card--featured .fw-card__desc {
  color: #fff;
}

.fw-card__num {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0051a8;
  letter-spacing: .1em;
  margin-bottom: 1.6rem;
  opacity: .6;
}

.fw-card--featured .fw-card__num {
  color: rgba(255,255,255,.6);
}

.fw-card__title {
  font-size: 2.4rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1.2rem;
}

.fw-card__desc {
  font-size: 1.5rem;
  color: #64748b;
  line-height: 1.6;
}

/* ─── ADVANTAGES ────────────────────────────────────── */
.advantages {
  padding: 10rem 0;
  background: #f4f4f5;
}

.adv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.4rem;
}

.adv-card {
  background: #fff;
  border-radius: 1.6rem;
  padding: 3rem 2.4rem;
  transition: box-shadow .2s, transform .2s;
}

.adv-card:hover {
  box-shadow: 0 8px 32px rgba(0,81,168,.08);
  transform: translateY(-4px);
}

.adv-card__icon {
  width: 5.6rem;
  height: 5.6rem;
  background: #e8f0fb;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.adv-card__icon img {
  width: 2.8rem;
  height: 2.8rem;
}

.adv-card__title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1rem;
}

.adv-card__desc {
  font-size: 1.5rem;
  color: #64748b;
  line-height: 1.6;
}

/* ─── CTA ───────────────────────────────────────────── */
.cta {
  padding: 10rem 0;
  background: #fff;
}

.cta__inner {
  background: #0051a8;
  border-radius: 2.4rem;
  padding: 8rem 6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta__bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.cta__title {
  font-size: 4.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.6rem;
  position: relative;
}

.cta__sub {
  font-size: 1.8rem;
  color: rgba(255,255,255,.75);
  margin-bottom: 4rem;
  position: relative;
}

.cta__btn {
  font-size: 1.8rem;
  padding: 1.6rem 4rem;
  background: #fff;
  color: #0051a8;
  border-radius: .8rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: transform .15s, box-shadow .15s;
  position: relative;
}

.cta__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.2);
}
</style>