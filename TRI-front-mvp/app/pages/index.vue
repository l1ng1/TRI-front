<template>
    <section class="hero">
        <div class="cont hero__content">
            <h1 class="hero__title">Приглашаем на платформу<br>текстовых ролевых игр</h1>
            <p class="hero__subtitle">ТРИ — идеальная среда для ваших историй.</p>
            <div class="hero__actions">
                <NuxtLink v-if="!userStore.isAuthenticated" to="/registration" class="btn btn_white">Начать играть</NuxtLink>
                <NuxtLink v-else to="/games" class="btn btn_white">К моим играм</NuxtLink>
                <NuxtLink to="/games" class="btn btn_outline">Поиск игры</NuxtLink>
            </div>
            <div class="hero__image">
                <span>Скриншот платформы</span>
            </div>
        </div>
    </section>

    <section class="audience">
        <div class="cont">
            <span class="line"></span>
            <h2 class="audience__title">Для кого наша платформа</h2>
            <div class="cards">
                <div class="card">
                    <h3 class="card__title">Гейм-мастера</h3>
                    <p class="card__description">Создавай игры, используя широкий функционал платформы. Находи активных игроков и получай удовольствие.</p>
                </div>
                <div class="card card_second">
                    <h3 class="card__title">Игроки</h3>
                    <p class="card__description">Думаешь, что тебе сложно угодить? Уверены, мы найдём чем тебя удивить. У нас большой выбор активных игр и удобный поиск.</p>
                </div>
                <div class="card">
                    <h3 class="card__title">Писатели</h3>
                    <p class="card__description">Платформа ТРИ — твой шанс заявить о себе и получить признание в ролевом сообществе. Публикуй работы и собирай отклик.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="advantages">
        <div class="cont">
            <h2 class="advantages__title">Почему мы?</h2>
            <div class="advantages__cards">
                <div class="card-advantage">
                    <img src="../icon/advantage/Friends.svg" alt="">
                    <h3 class="card-advantage__title">Найдите своих людей</h3>
                    <p class="card-advantage__desc">
                        Знакомьтесь с игроками, которые разделяют ваши увлечения, и добавляйте их в друзья. Общайтесь в личных сообщениях, делитесь впечатлениями.
                    </p>
                </div>
                <div class="card-advantage">
                    <img src="../icon/advantage/Free.svg" alt="">
                    <h3 class="card-advantage__title">Никаких барьеров и платы</h3>
                    <p class="card-advantage__desc">
                        Просто заведите аккаунт — и играйте в своё удовольствие.
                    </p>
                </div>
                <div class="card-advantage">
                    <img src="../icon/advantage/gamepad.svg" alt="">
                    <h3 class="card-advantage__title">Игровые инструменты</h3>
                    <p class="card-advantage__desc">
                        Многофункциональные игровые комнаты: интерактивные карты, виртуальные кости, площадки для обсуждений и новостные ленты.
                    </p>
                </div>
                <div class="card-advantage">
                    <img src="../icon/advantage/world.svg" alt="">
                    <h3 class="card-advantage__title">Играйте где угодно</h3>
                    <p class="card-advantage__desc">
                        Запускайте игру в браузере любого устройства: будь то компьютер или ноутбук. Никаких границ.
                    </p>
                </div>
                <div class="card-advantage">
                    <img src="../icon/advantage/Notification.svg" alt="">
                    <h3 class="card-advantage__title">Объявления</h3>
                    <p class="card-advantage__desc">
                        Игра найдётся для всех. Не можете найти подходящую — создайте объявление с предпочтениями, и отклики не заставят себя ждать.
                    </p>
                </div>
            </div>
            <div class="center">
                <NuxtLink v-if="!userStore.isAuthenticated" to="/registration" class="btn">Начать играть</NuxtLink>
                <NuxtLink v-else to="/games" class="btn">К моим играм</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '~/stores/useUserStore'

definePageMeta({ layout: 'first-page' })

const userStore = useUserStore()
</script>

<style scoped>
/* Hero */
.hero {
    background-color: #0051A8;
    padding: 6rem 3rem 8rem;
    margin-bottom: 12rem;
}
.hero__content {
    display: flex; flex-direction: column; align-items: center;
}
.hero__title {
    font-size: 4.8rem; font-weight: 400; text-align: center;
    color: #fff; margin-bottom: 2.4rem; width: 80%; line-height: 1.2;
}
.hero__subtitle {
    text-align: center; color: #fff; font-size: 2.4rem;
    margin-bottom: 3.2rem; opacity: 0.9;
}
.hero__actions { display: flex; gap: 2rem; margin-bottom: 5rem; }
.btn_white {
    background-color: #fff; color: #0051A8;
    text-decoration: none; display: inline-block;
}
.btn_outline {
    background-color: transparent; color: #fff;
    border: 1px solid #fff; text-decoration: none; display: inline-block;
}
.hero__image {
    width: 80%; height: 36rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px dashed rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255, 255, 255, 0.6); font-size: 2rem;
}

/* Аудитория */
.audience { margin-bottom: 12rem; }
.line {
    display: block; height: 1px;
    background-color: #878794; margin-bottom: 4rem;
}
.audience__title {
    font-size: 6.4rem; font-weight: 400;
    margin-bottom: 4rem; color: var(--color-dark);
}
.cards {
    display: flex; flex-direction: row;
    gap: 4rem; justify-content: space-between;
}
.card {
    background-color: var(--color-blue);
    width: 33%; min-height: 26rem;
    border-radius: 1rem; padding: 2.4rem; color: #fff;
    box-shadow: 0 4px 12px rgba(0, 81, 168, 0.2);
}
.card_second { margin-top: 6rem; }
.card__title {
    font-size: 3.2rem; color: var(--color-light);
    text-align: center; margin-bottom: 1.6rem;
}
.card__description {
    font-size: 1.8rem; text-align: center; line-height: 1.5;
}

/* Преимущества */
.advantages { margin-bottom: 10rem; }
.advantages__title {
    text-align: center; color: var(--color-blue);
    font-size: 6.4rem; font-weight: 400; margin-bottom: 5rem;
}
.advantages__cards {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem; margin-bottom: 5rem;
}
.card-advantage {
    border: 1px solid #878794;
    display: flex; flex-direction: column; align-items: center;
    padding: 2rem 1.5rem; gap: 1.6rem; border-radius: 1rem;
    transition: box-shadow .2s, transform .2s;
}
.card-advantage:hover {
    box-shadow: 0 4px 16px rgba(0, 81, 168, 0.15);
    transform: translateY(-2px);
}
.card-advantage img { width: 4rem; height: 4rem; }
.card-advantage__title {
    text-align: center; color: var(--color-blue); font-size: 2rem;
}
.card-advantage__desc {
    text-align: center; font-size: 1.5rem;
    line-height: 1.5; color: #4a4a4a;
}
.center { text-align: center; }
.center .btn { text-decoration: none; display: inline-block; }
</style>
