<script>
import { nextTick } from "vue";
import {
  loadChatMessagesFromDB,
  saveChatMessage,
  suscribeToChatMessages,
  formatDate,
} from "../../services/chat-service";
import { subscribeToUserState } from "../../services/auth";
import { RouterLink } from "vue-router";
import ChatLoader from "../loaders/ChatLoader.vue";
import MainButton from "../MainButton.vue";

let unsubscribe = () => {};

export default {
  name: "Chat",
  components: { ChatLoader, MainButton },
  data() {
    return {
      messages: [],
      loadingMessages: true,

      newMessage: {
        name: "",
        surname: "",
        content: "",
        date: "",
      },

      user: {
        id: null,
        email: null,
        display_name: null,
        surname: null,
      },
    };
  },

  methods: {
    async SendMessage() {
      await saveChatMessage({
        name: this.user.display_name,
        surname: this.user.surname,
        content: this.newMessage.content,
        user_id: this.user.id,
      });

      this.newMessage.content = "";
    },

    formatDate,
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
  <div class="flex gap-4">
    <section class="w-9/12">
      <h2 class="sr-only">Lista de mensajes</h2>
      <div ref="chatContainer" class="h-100 overflow-y-auto p-4 border rounded">
        <div
          v-if="!loadingMessages"
          v-for="m in messages"
          :key="m.id"
          class="mb-4"
        >
          <RouterLink
            :to="`/usuario/${m.user_id}`"
            class="text-sm text-gray-400"
            ><span
              class="font-bold text-emerald-600 cursor-pointer hover:text-emerald-500 transition"
              >{{ m.name }} {{ m.surname }}</span
            >
            dijo:</RouterLink
          >
          <div>{{ m.content }}</div>
          <div class="text-xs text-gray-400">{{ formatDate(m.date) }}</div>
        </div>
        <div v-else class="m-4">
          <ChatLoader />
        </div>
      </div>
    </section>

    <section class="w-3/12">
      <h2 class="sr-only">Enviar un mensaje</h2>
      <form action="#" @submit.prevent="SendMessage">
        <div class="mb-4">
          <label for="text" class="block mb-2">Mensaje</label>
          <textarea
            type="text"
            id="text"
            class="w-full border rounded py-2 px-4 h-24"
            placeholder="Escribí tu mensaje acá"
            v-model="newMessage.content"
          >
          </textarea>
        </div>
        <MainButton type="submit" class="w-full">Enviar</MainButton>
      </form>
    </section>
  </div>
</template>
