<script>
import { getUserProfileById } from "../../services/user-profiles";
import PostLoader from "../loaders/PostLoader.vue";
import ProfileLoader from "../loaders/ProfileLoader.vue";
import PostCard from "../posts/PostCard.vue";
import { loadPostsByUser } from "../../services/posts-service";

export default {
  name: "UserProfileSection",
  components: { ProfileLoader, PostCard, PostLoader },
  emits: ["user-loaded"],

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
      loading: false,
      loadingPosts: true,
      posts: [],
    };
  },

  watch: {
    '$route.params.id': {
      immediate: true,
      handler(newId) {
        this.loadUserData(newId);
      },
    },
  },

  methods: {
    async loadUserData(userId) {
      try {
        this.loading = true;
        this.loadingPosts = true;

        this.user = await getUserProfileById(userId);
        this.posts = await loadPostsByUser(userId);

        this.$emit("user-loaded", {
          display_name: this.user.display_name,
          surname: this.user.surname,
        });
      } catch (error) {
        console.error("Error cargando datos del perfil de usuario:", error);
      } finally {
        this.loading = false;
        this.loadingPosts = false;
      }
    },
  },
};

</script>

<template>
  <section class="p-16 rounded shadow" v-if="!loading">
    <div class="flex mb-8 gap-8">
      <div v-if="user.photo" class="h-auto aspect-square">
        <img
          :src="user.photo"
          alt="Foto de perfil"
          class="block rounded border shadow-md shadow-gray-400 h-full object-cover"
        />
      </div>
      <div class="flex flex-col p-8 shadow rounded bg-emerald-50">
        <h2 class="font-bold text-2xl mb-2">Biografía</h2>
        <p class="italic font-light text-emerald-800 ms-8">
          {{ user.bio || "Aún no se escribió la biografía..." }}
        </p>
      </div>
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
    <p class="ftext-center mb-2 mt-8">
      <span class="font-bold">{{ user.display_name }}</span> realizó las
      siguientes publicaciones:
    </p>
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
        :post_id="post.id"
      />
    </div>
    <div v-else class="flex justify-center items-center mt-8">
      <PostLoader />
    </div>
  </section>
</template>
