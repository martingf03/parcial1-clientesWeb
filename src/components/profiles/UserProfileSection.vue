<script>
import { getUserProfileById } from "../../services/user-profiles";
import PostLoader from "../loaders/PostLoader.vue";
import ProfileLoader from "../loaders/ProfileLoader.vue";
import PostCard from "../posts/PostCard.vue";
import { loadPostsByUser } from "../../services/posts-service";

export default {
  name: "UserProfileSection",
  components: { ProfileLoader, PostCard, PostLoader },
  emits: ['user-loaded'],

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
      loadingPosts: true,
      posts: [],
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

    try {
      this.posts = await loadPostsByUser(this.user.id);
      this.loadingPosts = false;
    } catch (error) {
      console.error("Error cargando publicaciones del usuario", error);
    }
  },
};
</script>

<template>
  <section class="p-16 rounded shadow" v-if="!loading">
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
  <div
    v-else
    class="flex justify-center items-center p-16 rounded shadow w-5xl"
  >
    <ProfileLoader />
  </div>

  <section class="flex flex-col justify-center items-center mt-8">
    <p class="ftext-center mb-2 mt-8"><span class="font-bold">{{ user.display_name }}</span> realizó las siguientes publicaciones:</p>
    <div
      v-if="!loadingPosts"
      ref="postsContainer"
      class="my-8 flex flex-col justify-center items-center gap-6"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :user_id="user.id"
        :display_name="user.display_name"
        :surname="user.surname"
        :content="post.content"
        :date="post.created_at"
      />
    </div>
    <div v-else class="flex justify-center items-center mt-8">
      <PostLoader />
    </div>
  </section>
</template>
