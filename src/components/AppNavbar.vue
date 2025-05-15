<script>
import { subscribeToUserState } from "../services/auth";

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

  mounted() {
    subscribeToUserState(newUserState => this.user = newUserState)
  }

};
</script>

<template>
  <nav class="bg-emerald-400 border-b-4 border-b-emerald-500">
    <ul class="flex items-center gap-8 p-4 font-[Lexend] text-lg">
      <li class="hover:text-white transition duration-200 ease-in-out">
        <router-link to="/">Home</router-link>
      </li>
      <template v-if="user.id !== null">
        <li class="hover:text-white transition duration-200 ease-in-out">
          <router-link to="/chat">Chat Global</router-link>
        </li>
        <li>
          {{ user.email }}
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
  </nav>
</template>
