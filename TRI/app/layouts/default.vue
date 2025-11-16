<template>

    <header>
        <div class="cont">
            <div class="logo">
                TRI
                <input type="text" placeholder="Поиск" @keydown="(ev)=>navSearch(ev)">
            </div>
            <div class="menu">
                <button>profile</button>
                <button>message</button>
                <button>notifications</button>
            </div>
        </div>
    </header>
    <main>
        <div class="cont">
            <div class="side-bar">
                <ul>
                    <li v-for="(i,index) in tabs" :key="index">
                        <NuxtLink :to="i.link">{{ i.name }}</NuxtLink>
                    </li>
                </ul>
            </div>
            <slot class="main-contnet"> </slot>
        </div>
    </main>
    



</template>

<script setup>

const tabs = reactive([
    {
        name:'Новости',
        link:'/news'
    },
    {
        name:'Игры',
        link:'/games'
    },
    {
        name:'Квесты',
        link:'/quests'
    },
    {
        name:'Персонажи',
        link:'/characters'
    },
    {
        name:'Сообщения',
        link:'/messegaes'
    },
    {
        name:'Сообщения об ошибках',
        link:'/errors'
    }
]);

function navSearch(ev){
    console.log(ev.key)
    if(ev.code == 'Enter'){
        navigateTo('login');
    }    
}


</script>

<style scoped>
    .cont{
        width: 1120px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between
    }
    header{
        padding: 20px 0px;
    }

    /* .logo{
        width: 75%;
    }
    .menu{
        width: 25%;
    } */

    .side-bar{
        display: flex;
        flex-direction: column;
        width: 25%;
    }
    .side-bar ul{
        list-style: none;
    }

    li a{
        text-decoration: none;
        color: black;
    }
    li, li a{
        transition: all 0.15s;
    }
    li:hover{
        padding-left: 5px;
    }
    .main-content{
        width: 85%;
    }
    .router-link-active{
        padding-left: 5px;
    }

</style>