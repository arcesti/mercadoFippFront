import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import FormCategoria from './components/FormCategoria.vue'
import Feed from './components/Feed.vue';
import AnuncioEspecifico from "./components/AnuncioEspecifico.vue"
import ListaUsuarios from "./components/UserControl.vue"
import AcessoNegado from './components/AcessoNegado.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/categoria/:msg', component: FormCategoria, props: true, meta: { requiresLevel: "1" } },
        { path: '/usuario/:msg', component: ListaUsuarios, props: true, meta: { requiresLevel: "1" } },
        { path: '/anuncio/:id', component: Feed, props: true },
        { path: '/', component: Feed },
        { path: '/anuncioEspecifico/:id', component: AnuncioEspecifico, props: true },
        { path: '/acesso-negado', component: AcessoNegado }
    ]
});

function isTokenExpired(token) {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
}

function checkUserLevel(requiredLevel) {
    const token = localStorage.getItem('token');

    if (!token) {
        return { hasAccess: false, redirect: '/login' };
    }

    if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        return { hasAccess: false, redirect: '/login' };
    }

    const decoded = decodeJWT(token);
    if (!decoded) {
        return { hasAccess: false, redirect: '/login' };
    }

    // Verifica se tem o level necessário
    if (decoded.level !== requiredLevel) {
        return { hasAccess: false, redirect: '/acesso-negado' };
    }

    return { hasAccess: true };
}

function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

// Aplicar títulos nas rota.
router.beforeEach((to, from, next) => {
    const titulo = "Mercado FIPP";
    document.title = to.meta.title || titulo;
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    // if (to.meta.requiresAuth && !usuario)
    //     return next("/login");
    // if (to.meta.requiresAdmin && (!usuario || usuario.nivel !== "0"))
    //     return next("/nao-autorizado");

    if (to.meta.requiresLevel !== undefined) {
        const accessCheck = checkUserLevel(to.meta.requiresLevel);

        if (!accessCheck.hasAccess) {
            return next(accessCheck.redirect);
        }
    }

    next();
});

const app = createApp(App)
// createApp(App).mount('#app')
app.use(router);
app.mount("#app")