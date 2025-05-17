import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import { subscribeToUserState } from "../services/auth";

const Chat = () => import("../pages/Chat.vue");
const Login = () => import("../pages/Login.vue");
const Register = () => import("../pages/Register.vue");
const MyProfile = () => import("../pages/MyProfile.vue");

const routes = [
    { path: "/", component: Home },
    { path: "/iniciar-sesion", component: Login },
    { path: "/registro", component: Register },
    { path: "/chat", component: Chat, meta: { requiresAuth: true } },
    { path: "/mi-perfil", component: MyProfile, meta: { requiresAuth: true } },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null
};

subscribeToUserState(newUserData => {
    user = newUserData;
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && user.id === null) {
        return { path: '/iniciar-sesion' };
    }

    if (to.meta.onlyGuest && user.id !== null) {
        return { path: '/' };
    }
});

export default router;
