<script>
import { getUserProfileById } from "../../services/user-profiles";
import PostLoader from "../loaders/PostLoader.vue";
import ProfileLoader from "../loaders/ProfileLoader.vue";
import PostCard from "../posts/PostCard.vue";
import { loadPostsByUser } from "../../services/posts-service";
import UserProfileData from "./UserProfileData.vue";

export default {
  name: "UserProfileSection",
  components: { ProfileLoader, PostCard, PostLoader, UserProfileData },
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
    "$route.params.id": {
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
  <section class="p-3" v-if="!loading">
    <UserProfileData :user="user" />
  </section>
  <div
    v-else
    class="flex justify-center items-center p-16 rounded shadow w-5xl"
  >
    <ProfileLoader />
  </div>

  <section class="flex flex-col justify-center items-center mt-8">
    <p class="text-center mb-2 mt-8">
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
