<script>
import { subscribeToUserState, updateAuthUserProfile, updateAuthEmail, updateAuthPassword  } from "../../services/auth";
import MainButton from "../MainButton.vue";
import ButtonLoader from "../loaders/ButtonLoader.vue";
import SuccessNote from "../notifications/SuccessNote.vue";
import ErrorNote from "../notifications/ErrorNote.vue";


let unsubscribe = () => {};

export default {
  name: "MyProfileEditSection",
  components: { MainButton, ButtonLoader, SuccessNote, ErrorNote }, 
  data() {
    return {
      user: {
        id: null,
        email: null,
        bio: null,
        display_name: null,
        career: null,
        surname: null,
      },
      profile: {
        display_name: null,
        bio: null,
        career: null,
        surname: null,
      },
      updating: false,

      notification: {
        type: "success",
        message: null,
      },
      
      authEmail: "",
      authUpdatingEmail: false,

      authPassword: "",
      authUpdatingPassword: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.notification.message = null;

        try {
            this.updating = true;
            await updateAuthUserProfile({
                ...this.profile
            });

            console.info("Se actualizó el perfil del usuario:", this.profile.display_name);
            this.notification = {
              type: "success",
              message: "El perfil se actualizó con éxito.",
            }

            this.updating = false;

        } catch (error) {
            this.notification = {
              type: "error",
              message: "No se pudo actualizar el perfil.",
            }
            console.error("No se pudo actualizar el perfil debido al siguiente error: ", error);
        }
    },

    async handleAuthEmail() {
  this.notification.message = null;

  try {
    this.authUpdatingEmail = true;

    await updateAuthEmail(this.authEmail);

    this.notification = {
      type: "success",
      message: "Se envió un email a tu casilla anterior para confirmar la actualización de tu nuevo email.",
    };
  } catch (error) {
    console.error("Error actualizando el email:", error);
    this.notification = {
      type: "error",
      message: "No se pudo actualizar el email.",
    };
  };
    this.authUpdatingEmail = false;
  
},
    async handleAuthPassword() {
  this.notification.message = null;

  try {
    this.authUpdatingPassword = true;

    await updateAuthPassword(this.authPassword);

    this.notification = {
      type: "success",
      message: "Se actualizó tu contraseña.",
    };
  } catch (error) {
    console.error("Error actualizando la contraseña:", error);
    this.notification = {
      type: "error",
      message: "No se pudo actualizar la contraseña.",
    };
  };
    this.authUpdatingPassword = false;
  
}


  },

  mounted() {
    unsubscribe = subscribeToUserState((newUserState) => {
        this.user = newUserState;
        this.profile = {
            bio: this.user.bio,
            display_name: this.user.display_name,
            career: this.user.career,
            surname: this.user.surname,
        }
    });
  },

  unmounted() {
    unsubscribe();
  }
};
</script>

<template>
  <template v-if="notification.message != null">
    <div v-if="notification.type === 'success'">
       <SuccessNote>{{ notification.message }}</SuccessNote>
    </div>
    <div v-else>
        <ErrorNote>{{ notification.message }}</ErrorNote>
    </div>
  </template>

  <section class="p-3">
    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="bio" class="block mb-2">Biografía</label>
        <textarea
          type="bio"
          id="bio"
          class="w-full border rounded py-2 px-4 h-24"
          v-model="profile.bio"
        ></textarea>
      </div>
      <div class="flex gap-8">
          <div class="mb-4">
            <label for="display_name" class="block mb-2">Nombre</label>
            <input
              type="text"
              id="display_name"
              class="w-full border rounded p-2"
              v-model="profile.display_name"
            >
            </input>
          </div>
          <div class="mb-4">
            <label for="surname" class="block mb-2">Apellido</label>
            <input
              type="text"
              id="surname"
              class="w-full border rounded p-2"
              v-model="profile.surname"
            >
            </input>
          </div>
          <div class="mb-4">
            <label for="career" class="block mb-2">Carrera</label>
            <input
              type="text"
              id="career"
              class="w-full border rounded p-2"
              v-model="profile.career"
            >
            </input>
          </div>
      </div>
        <div v-if="!updating">
          <MainButton type="submit" class="mt-4">Guardar cambios</MainButton>
        </div>
        <div v-else>
          <button class="mt-4 py-2 px-4 rounded bg-gray-200 text-gray-400">Cargando <ButtonLoader /></button>
        </div>
    </form>
  </section>
  <section class="p-3">
    <h2 class="text-2xl font-bold mb-4">Cambiar credenciales de acceso</h2>
    <div class="flex gap-8">
        <form action="#" @submit.prevent="handleAuthEmail" class="w-xl">
          <label for="new_email" class="block mb-2">Email</label>
          <input
            type="email"
            id="new_email"
            class="w-full border rounded p-2 mb-4"
            v-model="authEmail"
            placeholder="Tu nuevo email"
          >
          <div v-if="!authUpdatingEmail">
            <MainButton type="submit">Actualizar Email</MainButton>
          </div>
          <div v-else>
            <button class="py-2 px-4 rounded bg-gray-200 text-gray-400">Cargando <ButtonLoader /></button>
          </div>
      </form>
      <form action="#" @submit.prevent="handleAuthPassword" class="w-xl">
          <label for="new_password" class="block mb-2">Contraseña</label>
          <input
            type="password"
            id="new_password"
            class="w-full border rounded p-2 mb-4"
            v-model="authPassword"
            placeholder="Tu nueva contraseña"
          >
          <div v-if="!authUpdatingPassword">
            <MainButton type="submit">Actualizar contraseña</MainButton>
          </div>
          <div v-else>
            <button class="py-2 px-4 rounded bg-gray-200 text-gray-400">Cargando <ButtonLoader /></button>
          </div>
      </form>
    </div>


  </section>
</template>
