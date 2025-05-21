<script>
import { login } from "../../services/auth";
import ButtonLoader from "../loaders/ButtonLoader.vue";
import MainButton from "../MainButton.vue";
import ErrorNote from "../notifications/ErrorNote.vue";

export default {
  name: "LoginSection",
  components: { MainButton, ButtonLoader, ErrorNote },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      loading: false,

      notification: {
        message: null,
      },
    };
  },

  methods: {
    async handleSubmit() {
      try {
        this.loading = true;
        await login(this.user.email, this.user.password);
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        this.loading = false;

        const errorMsg = error.message.toLowerCase();

        if (errorMsg.includes("invalid login credentials")) {
          this.notification.message = "Email o contraseña incorrectos.";
        } else if (errorMsg.includes("missing email or phone")) {
          this.notification.message = "Los campos no pueden estar vacíos.";
        } else {
          this.notification.message = "Ocurrió un error al iniciar sesión.";
        }
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
      <template v-if="notification.message">
        <ErrorNote class="mx-auto">{{ notification.message }}</ErrorNote>
      </template>
      <div v-if="!loading">
        <MainButton type="submit" class="w-full">Iniciar sesión</MainButton>
      </div>
      <div v-else>
        <button
          class="py-2 px-4 rounded bg-gray-200 text-gray-400 text-center w-full"
        >
          Iniciando <ButtonLoader />
        </button>
      </div>
    </form>
  </div>
</template>
