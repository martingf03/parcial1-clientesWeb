<script>
import { register } from "../../services/auth";
import MainButton from "../MainButton.vue";
import NotificationNote from "../NotificationNote.vue";

export default {
  name: "Register",
  components: { MainButton, NotificationNote },
  data() {
    return {
      user: {
        email: "",
        password: "",
        display_name: "",
        surname: "",
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
      try {
        this.loading = true;
        await register(
          this.user.email,
          this.user.password,
          this.user.display_name,
          this.user.surname
        );
        this.loading = false;
        this.$router.push("/iniciar-sesion");
      } catch (error) {
        this.loading = false;
        console.error(error);

        const errorMsg = error.message.toLowerCase();

        this.notification.type = 'error';

        if (errorMsg.includes("anonymous sign-ins")) {
          this.notification.message = "Los campos no pueden estar vacíos.";
        } else if (
          errorMsg.includes("password should be at least 6 characters")
        ) {
          this.notification.message =
            "La contraseña debe tener al menos 6 caracteres.";
        } else if (errorMsg.includes("user already registered")) {
          this.notification.message = "Este usuario ya está registrado.";
        } else {
          this.notification.message =
            "Ocurrió un error al registrar la cuenta.";
        }
      }
    },
  },
};
</script>

<template>
  <div class="w-xl p-6 shadow rounded">
    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4 flex flex-col">
        <label for="name">Nombre</label>
        <input
          type="text"
          name="name"
          id="name"
          class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
          v-model="user.display_name"
        />
      </div>
      <div class="mb-4 flex flex-col">
        <label for="email">Apellido</label>
        <input
          type="text"
          name="surname"
          id="surname"
          class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
          v-model="user.surname"
        />
      </div>
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
        <NotificationNote
          :type="notification.type"
          @close="notification.message = null"
        >
          {{ notification.message }}
        </NotificationNote>
      </template>
      <MainButton
        :loading="loading"
        :loadingText="'Registrando'"
        :type="'submit'"
        class="w-full"
      >
        Crear cuenta
      </MainButton>
    </form>
  </div>
</template>
