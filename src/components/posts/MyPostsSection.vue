<script>
import {
  loadPostsByUser,
  suscribeToPostsChannel,
} from "../../services/posts-service";
import { subscribeToUserState } from "../../services/auth";
import PostCard from "./PostCard.vue";
import PostLoader from "../loaders/PostLoader.vue";

let unsubscribe = () => {};

export default {
  name: "MyPostsSection",
  components: { PostCard, PostLoader },
  data() {
    return {
      posts: [],
      loadingPosts: true,

      user: {
        id: null,
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

    unsubscribe = subscribeToUserState(async (newUserState) => {
      this.user = newUserState;

      if (this.user.id) {
        try {
          this.posts = await loadPostsByUser(this.user.id);
          this.loadingPosts = false;
        } catch (error) {
          console.error("Error cargando publicaciones del usuario", error);
        }
      }
    });

  },

  async unmounted() {
    unsubscribe();
  },
};
</script>

<template>
  <section>
    <h2 class="sr-only">Lista de mis publicaciones</h2>
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
        :file_url="post.file_url"
        :content="post.content"
        :date="post.created_at"
        :post_id="post.id"
        :post_user_id="post.user_id"
        :auth_user_id="user.id"
      />
    </div>
    <div v-else class="flex justify-center items-center mt-8">
      <PostLoader />
    </div>
  </section>
</template>
