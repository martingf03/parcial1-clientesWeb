<script>
import { subscribeToUserState, updateAuthUserProfile } from "../../services/auth";
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
      }
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
        >
        </textarea>
      </div>
      <div class="flex gap-8">
          <div class="mb-4">
            <label for="display_name" class="block mb-2">Nombre</label>
            <input
              type="display_name"
              id="display_name"
              class="w-full border rounded p-2"
              v-model="profile.display_name"
            >
            </input>
          </div>
          <div class="mb-4">
            <label for="surname" class="block mb-2">Apellido</label>
            <input
              type="surname"
              id="surname"
              class="w-full border rounded p-2"
              v-model="profile.surname"
            >
            </input>
          </div>
          <div class="mb-4">
            <label for="career" class="block mb-2">Carrera</label>
            <input
              type="career"
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
</template>
