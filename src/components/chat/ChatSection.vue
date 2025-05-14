<script>

import { nextTick } from 'vue';
import { loadChatMessagesFromDB, saveChatMessage, suscribeToChatMessages } from '../../services/chat-service';

export default {
    name: "Chat",

    data() {
        return {
            messages: [],

            newMessage: {
                email: "",
                content: "",
                date: "",
            }
        }
    },

    methods: {
        async SendMessage() {
            await saveChatMessage({
                id: this.messages.length + 1,
                email: this.newMessage.email,
                content: this.newMessage.content,
                date: new Date().toLocaleString('es-AR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                }),
            },
            );
            
            this.newMessage.content = "";
        }
    },

    async mounted() {
        suscribeToChatMessages(async newMessageReceived => {
            this.messages.push(newMessageReceived);
            await nextTick();
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        });

        try {
            this.messages = await loadChatMessagesFromDB();
            await nextTick();
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        } catch (error) {
            
        }
    }
};
</script>

<template>
    <div class="flex gap-4">

        <section class="w-9/12">
            <h2 class="sr-only">Lista de mensajes</h2>
            <div
            ref="chatContainer" 
            class="h-100 overflow-y-auto p-4 border rounded"
            >
                <div v-for="m in messages" :key="m.id" class="mb-4">
                    <div class="text-sm"><span class="font-bold text-emerald-600">{{ m.email }} dijo:</span></div>
                    <div>{{ m.content }}</div>
                    <div class="text-xs text-gray-400">{{ m.date }}</div>
                </div>
            </div>
        </section>

        <section class="w-3/12">
            <h2 class="mb-4 text-lg font-bold">Enviar un mensaje</h2>
            <form action="#" @submit.prevent="SendMessage">
                <div class="mb-4">
                    <label for="user" class="block mb-2">Nombre de usuario</label>
                    <input type="text" id="user" class="w-full border rounded py-2 px-4" v-model="newMessage.email">
                </div>
                <div class="mb-4">
                    <label for="text" class="block mb-2">Mensaje</label>
                    <textarea type="text" id="text" class="w-full border rounded py-2 px-4"
                        v-model="newMessage.content">
        </textarea>
                </div>
                <button type="submit"
                    class="transition py-2 px-4 rounded bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 text-white w-full">
                    Enviar
                </button>
            </form>
        </section>
    </div>
</template>