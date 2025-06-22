<script>
import { subscribeToUserState } from "../../services/auth";
import MainButton from "../MainButton.vue";
import {
  loadPostsFromDB,
  suscribeToPostsChannel,
} from "../../services/posts-service";
import PostCard from "./PostCard.vue";
import PostLoader from "../loaders/PostLoader.vue";

let unsubscribe = () => {};

export default {
  name: "GeneralPostsSection",
  components: { MainButton, PostCard, PostLoader },
  data() {
    return {
      posts: [],
      loadingPosts: true,

      user: {
        id: null,
        email: null,
        display_name: null,
        surname: null,
      },
    };
  },

async mounted() {
    suscribeToPostsChannel((post) => {
      const index = this.posts.findIndex((p) => p.id === post.id);

      if (post.isDeleted) {
        if (index !== -1) this.posts.splice(index, 1); 
      } else if (index !== -1) {
        this.posts[index] = post; 
      } else {
        this.posts.unshift(post); 
      }
    });

    try {
      this.posts = await loadPostsFromDB();
      this.loadingPosts = false;
    } catch (error) {
      console.error(
        "[loadPostsFromDB GeneralPostsSection] Error al traer las publicaciones de la base de datos: ",
        error
      );
    }

    unsubscribe = subscribeToUserState(
      (newUserState) => (this.user = newUserState)
    );
  },

  async unmounted() {
    unsubscribe();
  },
};
</script>

<template>
  <section v-if="user.id" class="flex gap-4">
    <h2 class="sr-only">Lista general de publicaciones</h2>
    <div
      v-if="!loadingPosts"
      ref="postsContainer"
      class="my-8 mx-auto flex flex-col justify-center items-center gap-6"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :user_id="post.user_id"
        :display_name="post.user_profiles.display_name"
        :surname="post.user_profiles.surname"
        :file_url="post.file_url"
        :content="post.content"
        :date="post.created_at"
        :post_id="post.id"
        :post_user_id="post.user_id"
        :auth_user_id="user.id"
      />
    </div>
    <div v-else class="flex justify-center items-center mx-auto mt-8">
      <PostLoader />
    </div>
  </section>
  <section v-else class="mx-auto text-xl font-bold my-16">
    <p>¡Conectate para ver quienes están publicando!</p>
  </section>
</template>
