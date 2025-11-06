<template>

    <header>
        <div class="cont">
            <div class="logo">
                TRI
            </div>
            <div class="menu">
                <button>profile</button>
                <button>search</button>
                <button>notifications</button>
            </div>
        </div>
    </header>
    <main>
        <div class="cont">
            <div class="side-bar">
                Текущие ролевые игры
                <ul>
                    <li v-for="i in arr" :key="index">
                        {{ i }}
                    </li>
                </ul>
            </div>
            <slot class="main-contnet"> </slot>
        </div>
    </main>
    

</template>

<script setup>

let arr = ref(['Игра 1','Игра 2','Игра 3','Игра 4']);

</script>

<style scoped>
    .cont{
        width: 1120px;
        margin: 0 auto;
    }
    .cont{
        display: flex;
        justify-content: space-between;
    }
    header{
        padding: 20px 0px;
    }

    .logo{
        width: 75%;
    }
    .menu{
        width: 25%;
    }

    .side-bar{
        display: flex;
        flex-direction: column;
        width: 25%;
    }
    .main-content{
        width: 85%;
    }

</style>