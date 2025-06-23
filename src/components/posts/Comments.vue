<script>
import {
  loadCommentByPost,
  suscribeToCommentsChannel,
  addComment,
} from "../../services/comments-service";
import { subscribeToUserState } from "../../services/auth";
import { formatDate } from "../../services/chat-service";


let unsubscribe = () => {};

export default {
  name: "Comments",
  props: {
    post_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      showComments: false,
      newComment: {
        post_id: "",
        content: "",
      },
      commentError: "",
      user: {
        id: "",
      },
    };
  },

  async mounted() {
    this.newComment.post_id = this.post_id;

    suscribeToCommentsChannel(this.post_id, async (newDBComment) => {
      if (newDBComment.post_id === this.post_id) {
        this.comments.push(newDBComment);
      }
    });

    unsubscribe = subscribeToUserState(
      (newUserState) => (this.user = newUserState)
    );
  },

  async unmounted() {
    unsubscribe();
  },

  methods: {
    async toggleComments() {
      try {
        const data = await loadCommentByPost(this.post_id);
        this.comments = data;
      } catch (error) {
        console.error("Error al cargar comentarios:", error);
      }
      this.showComments = !this.showComments;
    },

    async submitComment() {
      this.commentError = null;

      if (!this.newComment.content.trim()) {
        this.commentError = "El comentario no puede estar vacío.";
        return;
      }

      try {
        await addComment({
          post_id: this.newComment.post_id,
          user_id: this.user.id,
          content: this.newComment.content,
        });

        this.newComment.content = "";
      } catch (error) {
        console.error("Error al enviar comentario:", error);
        this.commentError = "Ocurrió un error al publicar el comentario.";
      }
    },
    formatDate,

  },
};
</script>

<template>
  <div class="my-4">
    <p
      class="text-emerald-700 text-sm underline hover:text-emerald-500 focus:text-emerald-500 cursor-pointer text-end"
      @click="toggleComments"
    >
      {{ showComments ? "Ocultar comentarios" : "Mostrar comentarios" }}
    </p>
  </div>
  <div v-if="showComments" class="mt-2 pt-2 border-t border-t-gray-200">
    <form @submit.prevent="submitComment" class="mt-4">
      <label for="text" class="sr-only">Agregar comentario</label>
      <div class="flex items-start space-x-2 mb-2">
        <textarea
          id="text"
          class="w-full border rounded py-2 px-3 h-12"
          v-model="newComment.content"
          placeholder="Escribe tu comentario..."
        ></textarea>
        <button
          type="submit"
          class="transition py-2 px-4 rounded bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 text-white cursor-pointer h-10"
        >
          Enviar
        </button>
      </div>
      <p v-if="commentError" class="text-red-500 text-sm mt-1">
        {{ commentError }}
      </p>
    </form>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="text-sm text-gray-700 border-b border-b-gray-200 p-4 flex items-center justify-start gap-4"
    >
      <div class="w-[10%]">
        <img
          :src="comment.user_profiles.photo"
          alt="Avatar de usuario"
          class="rounded"
        />
      </div>
      <div>
        <p
          @click="$router.push(`/usuario/${comment.user_id}`)"
          class="font-bold text-emerald-600 cursor-pointer hover:text-emerald-500 transition"
        >
          {{ comment.user_profiles.display_name }}
          {{ comment.user_profiles.surname }}
        </p>
        <p class="mb-1">{{ comment.content }}</p>
        <p class="text-xs text-gray-500">
          Publicado {{ formatDate(comment.created_at) }}
        </p>
      </div>
    </div>

    <div v-if="comments.length === 0" class="text-gray-400 text-sm my-4">
      Aún no hay comentarios.
    </div>
  </div>
</template>
