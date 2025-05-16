import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { subscribeToUserState } from "../services/auth";

const routes = [
    { path: "/", component: Home },
    { path: "/chat", component: Chat, meta: { requiresAuth: true } },
    { path: "/iniciar-sesion", component: Login },
    { path: "/registro", component: Register },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

let user = {
    id: null,
    email: null
}

subscribeToUserState(newUserData => user = newUserData);

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && user.id === null) {
            return {
            path: '/iniciar-sesion',
        }
    }
});

export default router;