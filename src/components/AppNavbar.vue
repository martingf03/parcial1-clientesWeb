<script>
import { logout, subscribeToUserState } from "../services/auth";

export default {
  name: "AppNavbar",
  data() {
    return {
      user: {
        id: null,
        email: null,
      }

    }
  },

  methods: {
    handleLogout() {
     logout()
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
    <div class="flex justify-between items-center p-4 font-[Lexend] text-lg">
      <ul class="flex items-center gap-8">
        <li class="hover:text-white transition duration-200 ease-in-out">
          <router-link to="/">Home</router-link>
        </li>
        <template v-if="user.id !== null">
          <li class="hover:text-white transition duration-200 ease-in-out">
            <router-link to="/chat">Chat Global</router-link>
          </li>
        </template>
      </ul>

      <ul class="flex items-center gap-6">
        <template v-if="user.id !== null">
          <li>{{ user.email }}</li>
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
