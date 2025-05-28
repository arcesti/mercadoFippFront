import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import FormCategoria from './components/FormCategoria.vue'
import Feed from './components/Feed.vue';
import AnuncioEspecifico from "./components/AnuncioEspecifico.vue"


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/categoria/:msg', component: FormCategoria, props:true},
        // { path:'/usuario/:msg', component: FormUsuario, props:true},
        { path:'/anuncio/:id', component: Feed, props:true},
        { path:'/', component: Feed},
        { path:'/anuncioEspecifico/:id', component: AnuncioEspecifico, props:true}
    ]
});

// Aplicar títulos nas rota.
router.beforeEach((to, from, next) => {
    const titulo = "Mercado FIPP";
    document.title = to.meta.title || titulo;
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    // if (to.meta.requiresAuth && !usuario)
    //     return next("/login");
    // if (to.meta.requiresAdmin && (!usuario || usuario.nivel !== "0"))
    //     return next("/nao-autorizado");
    next();
});

const app= createApp(App)
// createApp(App).mount('#app')
app.use(router);
app.mount("#app")