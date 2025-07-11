<script>
import { formatDate } from "../../services/chat-service";
import Comments from "../posts/Comments.vue";
import MainButton from "../MainButton.vue";
import SecondaryButton from "../SecondaryButton.vue";
import { editPost, deletePost } from "../../services/posts-service";
import NotificationNote from "../NotificationNote.vue";

export default {
  name: "PostCard",
  components: { MainButton, SecondaryButton, Comments, NotificationNote },
  props: {
    user_id: String,
    display_name: String,
    surname: String,
    date: String,
    file_url: String,
    content: String,
    post_id: String,
    post_user_id: String,
    auth_user_id: String,
  },
  data() {
    return {
      isEditing: false,
      editedContent: "",
      showDeleteModal: false,
      isSaving: false,
      isDeleting: false,
      notification: {
        type: "",
        message: null,
      },
    };
  },

  methods: {
    formatDate,
    startEdit() {
      this.editedContent = this.content;
      this.isEditing = true;
    },
    async saveEdit() {
      if (!this.editedContent.trim()) {
        this.notification = {
          type: "error",
          message: "El campo de edición no puede estar vacío",
        };
        return;
      }
      try {
        this.isSaving = true;
        await editPost(this.post_id, this.editedContent);
      } catch (error) {
        console.error("Error al editar la publicación.", error);
      } finally {
        this.isSaving = false;
        this.isEditing = false;
      }
    },
    async confirmDelete() {
      try {
        this.isDeleting = true;
        await deletePost(this.post_id, this.file_url);
      } catch (error) {
        console.error("[PostCard.vue] Error al eliminar publicación:", error);
      } finally {
        this.showDeleteModal = false;
        this.isDeleting = false;
      }
    },
  },
};
</script>

<template>
  <div
    class="w-xl rounded overflow-hidden shadow-lg shadow-gray-400 bg-white border"
  >
    <div>
      <div class="w-full h-96 overflow-hidden">
        <img
          :src="file_url"
          alt="Imagen de publicación"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div v-if="isEditing" class="px-6 py-4">
        <textarea
          v-model="editedContent"
          class="w-full p-2 border rounded mb-2 h-32"
        ></textarea>
        <template v-if="notification.message != null">
          <NotificationNote
            :type="notification.type"
            @close="notification.message = null"
          >
            {{ notification.message }}
          </NotificationNote>
        </template>
        <div class="flex justify-end gap-2 mb-4">
          <SecondaryButton @click="isEditing = false">Cancelar</SecondaryButton>
          <MainButton
            @click="saveEdit"
            :loading="isSaving"
            :loadingText="'Editando'"
          >
            Editar
          </MainButton>
        </div>
      </div>
      <div v-else class="px-6 pt-4">
        <p class="text-gray-900 text-base mb-4">
          {{ content }}
        </p>
      </div>
      <div class="px-6 pb-4">
        <div class="text-sm text-gray-500 mb-1">
          Publicado por
          <span
            @click="$router.push(`/usuario/${user_id}`)"
            class="font-bold text-emerald-600 cursor-pointer hover:text-emerald-500 transition"
          >
            {{ display_name }} {{ surname }}
          </span>
          {{ formatDate(date) }}
        </div>
        <div
          v-if="auth_user_id === post_user_id"
          class="flex justify-end gap-2 my-4"
        >
          <MainButton @click="startEdit" v-if="!isEditing">
            Editar publicación
          </MainButton>
          <MainButton
            v-if="!isEditing"
            @click="showDeleteModal = true"
            :loading="isDeleting"
            :loadingText="'Eliminando'"
          >
            Eliminar publicación
          </MainButton>
        </div>
        <div>
          <Comments :post_id="post_id" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showDeleteModal"
    class="fixed inset-0 bg-[#030712d3] flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full text-center">
      <p class="text-lg font-bold pb-4 border-b border-b-gray-200">
        ¿Estás seguro que querés eliminar esta publicación?
      </p>
      <font-awesome-icon
        :icon="['fas', 'triangle-exclamation']"
        class="mt-4 text-red-500 text-2xl"
      />
      <p class="mt-1 mb-4 text-sm text-red-500">
        También se borrarán los comentarios que tenga esta publicación.
      </p>
      <div class="flex justify-center gap-2">
        <MainButton @click="confirmDelete">Eliminar</MainButton>
        <SecondaryButton @click="showDeleteModal = false"
          >Cancelar</SecondaryButton
        >
      </div>
    </div>
  </div>
</template>
