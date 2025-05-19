import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import { subscribeToUserState } from "../services/auth";

const routes = [
    { path: "/", component: Home },
    { path: "/iniciar-sesion", component: () => import("../pages/Login.vue") },
    { path: "/registro", component: () => import("../pages/Register.vue") },
    { path: "/chat", component: () => import("../pages/Chat.vue"), meta: { requiresAuth: true } },
    { path: "/mi-perfil", component: () => import("../pages/MyProfile.vue"), meta: { requiresAuth: true } },
    { path: "/editar-mi-perfil", component: () => import("../pages/MyProfileEdit.vue"), meta: { requiresAuth: true } },
    { path: "/usuario/:id", component: () => import("../pages/UserProfile.vue"), meta: { requiresAuth: true } },
    { path: "/mis-publicaciones", component: () => import("../pages/MyPosts.vue"), meta: { requiresAuth: true } },
    { path: "/mis-publicaciones/nuevo-post", component: () => import("../pages/NewPost.vue"), meta: { requiresAuth: true } },
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
});

export default router;
