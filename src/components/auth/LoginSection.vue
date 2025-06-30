<script>
import { login } from "../../services/auth";
import MainButton from "../MainButton.vue";
import NotificationNote from "../NotificationNote.vue";

export default {
  name: "LoginSection",
  components: { MainButton, NotificationNote },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },

      loading: false,

      notification: {
        type: "",
        message: null,
      },
    };
  },

  methods: {
    async handleSubmit() {
      if (!this.user.email.trim() || !this.user.password.trim()) {
        this.notification = {
          type: "error",
          message: "Los campos no pueden estar vacíos.",
        };
        return;
      }
      this.loading = true;
      try {
        await login(this.user.email, this.user.password);
        this.loading = false;
        this.$router.push("/");
      } catch (error) {
        const errorMsg = error.message.toLowerCase();
        this.notification.type = "error";
        if (errorMsg.includes("invalid login credentials")) {
          this.notification.message = "Email o contraseña incorrectos.";
        } else if (errorMsg.includes("missing email or phone")) {
          this.notification.message = "Los campos no pueden estar vacíos.";
        } else {
          this.notification.message = "Ocurrió un error al iniciar sesión.";
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <div class="w-xl p-6 shadow rounded">
    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4 flex flex-col">
        <label for="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
          required
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
          required
          v-model="user.password"
        />
      </div>

      <template v-if="notification.message">
        <NotificationNote
          :type="notification.type"
          @close="notification.message = null"
        >
          {{ notification.message }}
        </NotificationNote>
      </template>

      <MainButton
        :loading="loading"
        :loadingText="'Iniciando'"
        :type="'submit'"
        class="w-full"
      >
        Iniciar sesión
      </MainButton>
    </form>
    <p class="text-center mt-5 mb-2 text-sm font-normal">
      ¿Aún no tenés un usuario? Registrate
      <router-link
        to="/registro"
        class="text-emerald-600 font-bold hover:underline hover:text-emerald-400"
        >acá</router-link
      >.
    </p>
  </div>
</template>
