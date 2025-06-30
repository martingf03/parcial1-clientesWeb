<script>
import MainButton from "../MainButton.vue";
import {
  subscribeToUserState,
  uploadAuthUserPostPhoto,
} from "../../services/auth";
import { savePost } from "../../services/posts-service";
import SuccessNote from "../notifications/SuccessNote.vue";
import ErrorNote from "../notifications/ErrorNote.vue";

let unsubscribe = () => {};

export default {
  name: "NewPostSection",

  components: { MainButton, SuccessNote, ErrorNote },

  data() {
    return {
      updating: false,

      user: {
        id: null,
      },
      newPost: {
        id: "",
        file: null,
        file_url: "",
        content: "",
        objectURL: null,
      },
      notification: {
        type: "success",
        message: null,
      },
    };
  },

  methods: {
    async publishPost() {
      const newPostContent = this.newPost.content?.trim();

      if (!newPostContent) {
        this.notification = {
          type: "error",
          message: "La publicación no puede estar vacía.",
        };
        return;
      }

      try {
        this.newPost.id = crypto.randomUUID();

        if (this.newPost.file) {
          const fileURL = await uploadAuthUserPostPhoto(
            this.newPost.file,
            this.newPost.id
          );
          this.newPost.file_url = fileURL;
        }

        await savePost({
          id: this.newPost.id,
          user_id: this.user.id,
          file_url: this.newPost.file_url,
          content: newPostContent,
        });

        this.notification = {
          type: "success",
          message: "La publicación fue creada con éxito.",
        };

        this.newPost = {
          id: "",
          file: null,
          file_url: "",
          content: "",
          objectURL: null,
        };
      } catch (error) {
        console.error("Error al crear la publicación:", error);
        this.notification = {
          type: "error",
          message: "Hubo un problema al crear la publicación.",
        };
      }
    },

    async handlePostFileImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.newPost.file = file;
      this.newPost.objectURL = URL.createObjectURL(file);
    },
  },

  async mounted() {
    unsubscribe = subscribeToUserState(
      (newUserState) => (this.user = newUserState)
    );
  },

  async unmounted() {
    unsubscribe();
    () => (this.newPost ? URL.revokeObjectURL(this.newPost) : "");
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
        <div>
          <p class="font-bold">Subir imagen de publicación</p>
          <p class="text-sm text-gray-500 italic mb-2">Tamaño máx: 2MB</p>
          <label
            for="post_image"
            class="block mb-4 text-emerald-700 underline hover:text-emerald-500 focus:text-emerald-500 cursor-pointer"
            >Seleccionar imagen</label
          >
          <input
            type="file"
            id="post_image"
            class="sr-only"
            @change="handlePostFileImage"
          />
          <div class="w-96 mb-6" v-if="newPost.objectURL">
            <div class="w-full h-60 overflow-hidden shadow-md shadow-gray-400 rounded">
              <img
                :src="newPost.objectURL"
                alt="Imagen de perfil actual"
                class="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <p
            class="mt-2 mb-4 text-gray-500 italic font-light text-sm"
            v-if="newPost.objectURL"
          >
            Previsualización de imagen de la publicación
          </p>
        </div>
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
      <MainButton 
        :loading="updating"
        :type="'submit'" 
        :loadingText="'Publicando'"
        class="mt-4"
      >
        Publicar
      </MainButton>
    </form>
  </section>
</template>
