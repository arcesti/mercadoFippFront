import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from "./components/FormUsuario.vue";
import Feed from './components/Feed.vue';
import AnuncioEspecifico from "./components/AnuncioEspecifico.vue"


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/categoria/:msg', component: FormCategoria, props:true},
        { path:'/usuario/:msg', component: FormUsuario, props:true},
        { path:'/anuncio', component: Feed},
        { path:'/anuncioEspecifico/:id', component: AnuncioEspecifico, props:true}
    ]
});

const app= createApp(App)
// createApp(App).mount('#app')
app.use(router);
app.mount("#app")