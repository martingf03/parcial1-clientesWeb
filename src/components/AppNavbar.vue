<script>
import { logout, subscribeToUserState } from "../services/auth";

export default {
  name: "AppNavbar",
  data() {
    return {
      user: {
        id: null,
        email: null,
        display_name: null,
        bio: null,
        career: null,
      }

    }
  },

  methods: {
    async handleLogout() {
      await logout()
      this.$router.push("/iniciar-sesion");
    }
  },

  mounted() {
    subscribeToUserState(newUserState => this.user = newUserState)
  }

};
</script>

<template>
  <nav class="bg-emerald-400 border-b-4 border-b-emerald-500">
    <div class="flex justify-between items-center font-[Lexend] text-lg h-16 px-6">

      <ul class="flex items-center gap-8">
        <li class="hover:text-white transition duration-200 ease-in-out">
          <router-link to="/">Home</router-link>
        </li>
        <template v-if="user.id !== null">
          <li class="hover:text-white transition duration-200 ease-in-out">
            <router-link to="/chat">Chat global</router-link>
          </li>
          <li class="hover:text-white transition duration-200 ease-in-out">
            <router-link to="/mis-publicaciones">Mis publicaciones</router-link>
          </li>
        </template>
      </ul>

      <ul class="flex items-center gap-8">
        <template v-if="user.id !== null">
          <li>
            <router-link to="/mi-perfil"
              class="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 py-2 px-4 text-center transition duration-200 ease-in-out"><font-awesome-icon :icon="['fas', 'circle-user']" />
              {{ user.display_name ? user.display_name : user.email }}
            </router-link>
          </li>
          <li class="hover:text-white transition duration-200 ease-in-out cursor-pointer" @click="handleLogout">
            Cerrar sesión
          </li>
        </template>
        <template v-else>
          <li class="hover:text-white transition duration-200 ease-in-out">
            <router-link to="/registro">Registro</router-link>
          </li>
          <li class="hover:text-white transition duration-200 ease-in-out">
            <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
