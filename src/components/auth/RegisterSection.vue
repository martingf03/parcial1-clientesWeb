<script>
import { register } from "../../services/auth";
import ButtonLoader from "../loaders/ButtonLoader.vue";
import MainButton from "../MainButton.vue";

export default {
  name: "Register",
  components: { MainButton, ButtonLoader },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        await register(this.user.email, this.user.password);
        this.loading = false;
      } catch (error) {
        // MANEJAR
      }
    },
  },
};
</script>

<template>
  <div class="w-2xl p-6 shadow rounded">
    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4 flex flex-col">
        <label for="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
          v-model="user.email"
        />
      </div>

      <div class="mb-4 flex flex-col">
        <label for="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
          v-model="user.password"
        />
      </div>
        <div v-if="!loading">
          <MainButton type="submit" class="w-full">Crear cuenta</MainButton>
        </div>
        <div v-else>
          <button class="py-2 px-4 rounded bg-gray-200 text-gray-400 text-center w-full">Registrando <ButtonLoader /></button>
        </div>
    </form>
  </div>
</template>
