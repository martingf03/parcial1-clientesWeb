<script>
import MainButton from "../MainButton.vue";
import ButtonLoader from "../loaders/ButtonLoader.vue";
import { subscribeToUserState } from "../../services/auth";
import { savePost } from "../../services/posts-service";
import SuccessNote from "../notifications/SuccessNote.vue";
import ErrorNote from "../notifications/ErrorNote.vue";

let unsubscribe = () => {};

export default {
  name: "NewPostSection",

  components: { MainButton, ButtonLoader, SuccessNote, ErrorNote },

  data() {
    return {
      updating: false,

      user: {
        id: null,
      },
      newPost: {
        content: "",
      },
      notification: {
        type: "success",
        message: null,
      },
    };
  },

  methods: {
    async publishPost() {
      let newPostContent = this.newPost.content;

      if (newPostContent) {
        await savePost({
          user_id: this.user.id,
          content: newPostContent,
        }),
          (this.newPost.content = "");
        this.notification = {
          type: "success",
          message: "La publicación fue creada con éxito.",
        };
      } else {
        this.notification = {
          type: "error",
          message: "La publicación no puede estar vacía.",
        };
      }
    },
  },

  async mounted() {
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
  <section class="p-3">
    <form action="#" @submit.prevent="publishPost">
      <template v-if="notification.message != null" class="transition">
        <div v-if="notification.type === 'success'">
          <SuccessNote>{{ notification.message }}</SuccessNote>
        </div>
        <div v-else>
          <ErrorNote>{{ notification.message }}</ErrorNote>
        </div>
      </template>
      <div class="mb-4">
        <label for="content" class="sr-only">Nueva publicación</label>
        <textarea
          type="content"
          id="content"
          class="w-full border rounded py-2 px-4 h-24"
          placeholder="Escribir aquí la nueva publicación..."
          v-model="newPost.content"
        >
        </textarea>
      </div>
      <div v-if="!updating">
        <MainButton type="submit" class="mt-4">Publicar</MainButton>
      </div>
      <div v-else>
        <button class="mt-4 py-2 px-4 rounded bg-gray-200 text-gray-400">
          Publicando <ButtonLoader />
        </button>
      </div>
    </form>
  </section>
</template>
