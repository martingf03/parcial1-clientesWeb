<script>
import { getUserProfileById } from "../../services/user-profiles";
import ProfileLoader from "../loaders/ProfileLoader.vue";

export default {
  name: "UserProfileSection",
  components: { ProfileLoader },
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
      loading: false,
    };
  },

  async mounted() {
    try {
      this.loading = true;
      this.user = await getUserProfileById(this.$route.params.id);

      this.loading = false;

      this.$emit("user-loaded", {
        display_name: this.user.display_name,
        surname: this.user.surname,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <section class="p-3" v-if="!loading">
    <div class="flex flex-col mb-10">
      <h2 class="font-bold text-2xl mb-2">Biografía</h2>
      <p class="italic font-light">
        {{ user.bio || "El usuario no ha publicado aún su biografía." }}
      </p>
    </div>
    <div class="flex gap-40 items-center">
      <div>
        <h2 class="font-bold text-2xl mb-2">Email</h2>
        <p>{{ user.email }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Nombre</h2>
        <p>{{ user.display_name || "No especificado" }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Apellido</h2>
        <p>{{ user.surname || "No especificado" }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Carrera</h2>
        <p>{{ user.career || "No especificado" }}</p>
      </div>
    </div>
  </section>
  <div v-else class="flex justify-center items-center h-100">
    <ProfileLoader />
  </div>
</template>
