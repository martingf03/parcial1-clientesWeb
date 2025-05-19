<script>

import MainButton from "../MainButton.vue";
import ButtonLoader from "../loaders/ButtonLoader.vue";
import { subscribeToUserState } from "../../services/auth";
import { savePost } from "../../services/posts-service";

let unsubscribe = () => {};

export default {
  name: "NewPostSection",

  components: { MainButton, ButtonLoader },

  data() {
    return {
      updating: false,

      user: {
        id: null,
      },
      newPost: {
        content: "",
      }
    };
  },

  methods: {
    async publishPost() {
        await savePost({
            user_id: this.user.id,
            content: this.newPost.content
        }),
        // console.info("Se realizó una nueva publicación.");
        // console.info("El id guardado es: ", this.user.id);
        // console.info("El contenido del texto del post es: ", this.newPost.content);

        this.newPost.content = "";
        this.$router.push("/mis-publicaciones");
    }
  },

  async mounted() {
    unsubscribe = subscribeToUserState(
        (newUserState) => (this.user = newUserState),
    );
  },

  async unmounted() {
    unsubscribe();
  }
};

</script>

<template>
  
  <section class="p-3">
    <form action="#" @submit.prevent="publishPost">
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
