<template>
    <section v-if="store.currentCharacter" class="character">
        <img class="icon" src="/placeholder-avatar.png" alt="Иконка персонажа" />

        <div class="character-wrapper">
            <p><strong>Имя персонажа:</strong> {{ store.currentCharacter.name }}</p>
            <p><strong>Описание:</strong> {{ store.currentCharacter.about || 'Нет описания' }}</p>
            <p><strong>Владелец:</strong> {{ store.currentCharacter.owners_name || 'Неизвестен' }}</p>
            <p><strong>Локация:</strong> {{ store.currentCharacter.location_name || 'Не указана' }}</p>
            <p><strong>Статус:</strong> {{ store.currentCharacter.status || 'Не указан' }}</p>

            <p><strong>Характеристики</strong></p>
            <p v-if="store.currentCharacter.characteristics" class="characteristics-text">
                {{ store.currentCharacter.characteristics }}
            </p>
            <p v-else class="no-data">Характеристики не указаны</p>

            <p v-if="deleteMessage" :class="{ success: deleteSuccess, error: !deleteSuccess }">
                {{ deleteMessage }}
            </p>

            <menu class="menu">
                <button class="btn-delete" @click="handleDelete">Удалить</button>
                <NuxtLink class="btn-edit" :to="`./charForm/${store.currentCharacter.id}`">
                    Редактировать
                </NuxtLink>
            </menu>
        </div>
    </section>

    <div v-else-if="store.error" class="error">
        Персонаж не найден или произошла ошибка
    </div>

    <div v-else class="loading">
        Загрузка персонажа...
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharactersStore } from '../../stores/useCharactersStore'

const route = useRoute()
const router = useRouter()
const store = useCharactersStore()

const characterId = computed(() => route.params.id as string)

const deleteMessage = ref('')
const deleteSuccess = ref(false)

onMounted(() => store.fetchById(characterId.value))

async function handleDelete() {
    if (!confirm('Вы уверены, что хотите удалить этого персонажа? Это действие нельзя отменить.')) {
        return
    }
    try {
        await store.remove(characterId.value)
        deleteSuccess.value = true
        deleteMessage.value = 'Персонаж успешно удалён!'
        setTimeout(() => router.push('/profile'), 1000)
    } catch (err) {
        deleteSuccess.value = false
        deleteMessage.value = 'Ошибка при удалении персонажа. Попробуйте позже.'
        console.error(err)
    }
}
</script>

<style scoped>
.character {
    display: flex;
    align-items: flex-start;
    gap: 75px;
    padding: 20px;
    margin: 40px 0;
    border: 1px solid #ddd;
    border-radius: 12px;
    background: #fcfcfc;
}

.icon {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #000;
    background: #eee;
}

.character-wrapper p {
    margin: 12px 0;
    max-width: 770px;
}

.characteristics-text {
    background: #f5f5f5;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 0.95rem;
    white-space: pre-wrap;
}

.no-data {
    color: #888;
    font-style: italic;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #666;
}

.error {
    text-align: center;
    padding: 40px;
    color: #d00;
}

.menu {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    gap: 1rem;
}

.btn-delete,
.btn-edit {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s ease;
}

.btn-delete {
    background: #ff4444;
    color: white;
}

.btn-delete:hover {
    background: #cc0000;
}

.btn-edit {
    background: #0066ff;
    color: white;
    text-decoration: none;
}

.btn-edit:hover {
    background: #0052cc;
}

.success {
    color: #00aa00;
    font-weight: 600;
    text-align: center;
    margin-top: 1rem;
}
</style>
