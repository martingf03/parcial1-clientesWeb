<script>
import { nextTick } from "vue";
import { subscribeToUserState } from "../../services/auth";
import MainButton from "../MainButton.vue";

let unsubscribe = () => {};

export default {
  name: "GeneralPostsSection",
  components: { MainButton },
  data() {
    return {
      posts: [],
      loadingPosts: null,
      
      user: {
        id: null,
        email: null,
        display_name: null,
        surname: null,
      },
    };
  },

  async mounted() {
    suscribeToChatMessages(async (newMessageReceived) => {
      this.messages.push(newMessageReceived);
      await nextTick();
      this.$refs.chatContainer.scrollTop =
        this.$refs.chatContainer.scrollHeight;
    });

    try {
      this.messages = await loadChatMessagesFromDB();
      this.loadingMessages = false;
      await nextTick();
      this.$refs.chatContainer.scrollTop =
        this.$refs.chatContainer.scrollHeight;
    } catch (error) {
      console.error(
        "[loadChatMessagesFromDB ChatSection] Error al traer los mensajes de la base de datos: ",
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
  <section class="flex gap-4">
     <h2 class="sr-only">Lista general de publicaciones</h2>

  </section>
</template>
