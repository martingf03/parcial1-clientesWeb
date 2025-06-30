<script>
import {
  subscribeToUserState,
  updateAuthUserProfile,
  updateAuthEmail,
  updateAuthPassword,
  updateAuthUserAvatar,
} from "../../services/auth";
import MainButton from "../MainButton.vue";
import NotificationNote from "../NotificationNote.vue";

let unsubscribe = () => {};

export default {
  name: "MyProfileEditSection",
  components: { MainButton, NotificationNote },
  data() {
    return {
      user: {
        id: null,
        email: null,
        bio: null,
        display_name: null,
        career: null,
        surname: null,
        photo: null,
      },
      profile: {
        display_name: null,
        bio: null,
        career: null,
        surname: null,
      },
      updating: false,

      notification: {
        type: "",
        message: null,
      },

      authEmail: "",
      authUpdatingEmail: false,

      authPassword: "",
      authUpdatingPassword: false,

      avatar: {
        file: null,
        objectURL: null,
      },

      avatarUpdating: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.notification.message = null;

      try {
        this.updating = true;
        await updateAuthUserProfile({
          ...this.profile,
        });

        console.info(
          "Se actualizó el perfil del usuario:",
          this.profile.display_name
        );
        this.notification = {
          type: "success",
          message: "El perfil se actualizó con éxito.",
        };

        this.updating = false;
      } catch (error) {
        this.notification = {
          type: "error",
          message: "No se pudo actualizar el perfil.",
        };
        console.error(
          "No se pudo actualizar el perfil debido al siguiente error: ",
          error
        );
      }
    },

    async handleAuthEmail() {
      this.notification.message = null;

      const emailTrimmed = this.authEmail.trim();

      if (!emailTrimmed) {
        this.notification = {
          type: "error",
          message: "Para actualizar, el campo de email no puede estar vacío.",
        };
        return;
      }

      try {
        this.authUpdatingEmail = true;

        await updateAuthEmail(emailTrimmed);

        this.notification = {
          type: "success",
          message:
            "Se envió un email a tu casilla anterior para confirmar la actualización de tu nuevo email.",
        };
      } catch (error) {
        console.error("Error actualizando el email:", error);
        this.notification = {
          type: "error",
          message: "No se pudo actualizar el email.",
        };
      }
      this.authUpdatingEmail = false;
    },

    async handleAuthPassword() {
      this.notification.message = null;

      const passwordTrimmed = this.authPassword.trim();
      if (!passwordTrimmed) {
        this.notification = {
          type: "error",
          message:
            "Para actualizar, el campo de contraseña no puede estar vacío.",
        };
        return;
      }
      try {
        this.authUpdatingPassword = true;

        await updateAuthPassword(passwordTrimmed);

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
      }
      this.authUpdatingPassword = false;
    },

    /**
     * Función que controla el evento del botón de selección de nueva imagen para el avatar.
     */
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.avatar.file = file;
      this.avatar.objectURL = URL.createObjectURL(file);
    },

    /**
     * Función que controla el submit de la nueva imagen subida.
     */
    async handleUploadImage() {
      if (!this.avatar.file) return;
      if (this.avatarUpdating) return;

      try {
        this.avatarUpdating = true;

        await updateAuthUserAvatar(this.avatar.file);

        this.notification = {
          type: "success",
          message: "La imagen ha sido actualizada con éxito.",
        };
      } catch (error) {
        console.error("Error al subir la imagen de perfil.", error);
        this.notification = {
          type: "error",
          message: "No se pudo cambiar la imagen de perfil.",
        };
      }
      this.avatarUpdating = false;
    },
  },

  mounted() {
    unsubscribe = subscribeToUserState((newUserState) => {
      this.user = newUserState;
      this.profile = {
        bio: this.user.bio,
        display_name: this.user.display_name,
        career: this.user.career,
        surname: this.user.surname,
      };
    });
  },

  unmounted() {
    unsubscribe();
    () => (this.avatar ? URL.revokeObjectURL(this.avatar) : "");
  },
};
</script>

<template>
  <template v-if="notification.message != null">
    <NotificationNote
      :type="notification.type"
      @close="notification.message = null"
      class="w-1/2"
    >
      {{ notification.message }}
    </NotificationNote>
  </template>

  <section class="p-3">
    <div class="flex items-end gap-4 mb-8">
      <div>
        <p class="mb-2 font-bold">Cambiar foto de perfil</p>
        <label
          for="avatar"
          class="block mb-2 text-emerald-700 underline hover:text-emerald-500 focus:text-emerald-500 cursor-pointer"
          >Seleccionar imagen</label
        >
        <input
          type="file"
          id="avatar"
          class="sr-only"
          @change="handleFileChange"
        />
        <div class="flex">
          <div class="w-60">
            <img
              :src="user.photo"
              alt="Imagen de perfil actual"
              class="block rounded border shadow-md shadow-gray-400 h-full object-cover aspect-square"
              v-if="!avatar.objectURL && user.photo"
            />
            <img
              :src="avatar.objectURL"
              alt="Imagen de perfil actual"
              class="block rounded border shadow-md shadow-gray-400 h-full object-cover aspect-square"
              v-if="avatar.objectURL"
            />
          </div>
        </div>
        <p
          class="mt-2 text-center text-gray-500 italic font-light text-sm"
          v-if="!avatar.objectURL && user.photo"
        >
          Foto actual
        </p>
        <p
          class="mt-2 text-center text-gray-500 italic font-light text-sm"
          v-if="avatar.objectURL"
        >
          Previsualización de foto nueva
        </p>
      </div>
      <div class="flex items-end" v-if="avatar.objectURL">
        <MainButton
          :loading="avatarUpdating"
          :loadingText="'Subiendo imagen'"
          @click="handleUploadImage"
        >
          Guardar imagen
        </MainButton>
      </div>
    </div>

    <form action="#" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="bio" class="block mb-2 font-bold">Biografía</label>
        <textarea
          type="bio"
          id="bio"
          class="w-full border rounded py-2 px-4 h-24"
          v-model="profile.bio"
        ></textarea>
      </div>
      <div class="flex gap-8">
        <div class="mb-4">
          <label for="display_name" class="block mb-2 font-bold">Nombre</label>
          <input
            type="text"
            id="display_name"
            class="w-full border rounded p-2"
            v-model="profile.display_name"
          />
        </div>
        <div class="mb-4">
          <label for="surname" class="block mb-2 font-bold">Apellido</label>
          <input
            type="text"
            id="surname"
            class="w-full border rounded p-2"
            v-model="profile.surname"
          />
        </div>
        <div class="mb-4">
          <label for="career" class="block mb-2 font-bold">Carrera</label>
          <input
            type="text"
            id="career"
            class="w-full border rounded p-2"
            v-model="profile.career"
          />
        </div>
      </div>
      <MainButton
        :loading="updating"
        :type="'submit'"
        :loadingText="'Guardando'"
      >
        Guardar cambios
      </MainButton>
    </form>
  </section>
  <section class="p-3">
    <h2 class="text-2xl font-bold mb-4">Cambiar credenciales de acceso</h2>
    <div class="flex gap-8">
      <form action="#" @submit.prevent="handleAuthEmail" class="w-xl">
        <label for="new_email" class="block mb-2 font-bold">Email</label>
        <input
          type="email"
          id="new_email"
          class="w-full border rounded p-2 mb-4"
          v-model="authEmail"
          placeholder="Tu nuevo email"
        />
        <MainButton
          :loading="authUpdatingEmail"
          :type="'submit'"
          :loadingText="'Actualizando'"
        >
          Actualizar email
        </MainButton>
      </form>
      <form action="#" @submit.prevent="handleAuthPassword" class="w-xl">
        <label for="new_password" class="block mb-2 font-bold"
          >Contraseña</label
        >
        <input
          type="password"
          id="new_password"
          class="w-full border rounded p-2 mb-4"
          v-model="authPassword"
          placeholder="Tu nueva contraseña"
        />
        <MainButton
          :loading="authUpdatingPassword"
          :type="'submit'"
          :loadingText="'Actualizando'"
        >
          Actualizar contraseña
        </MainButton>
      </form>
    </div>
  </section>
</template>
