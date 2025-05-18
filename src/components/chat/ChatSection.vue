<script>

import { nextTick } from 'vue';
import { loadChatMessagesFromDB, saveChatMessage, suscribeToChatMessages } from '../../services/chat-service';
import {subscribeToUserState} from '../../services/auth'

let unsubscribe = () => {};

export default {
    name: "Chat",

    data() {
        return {
            messages: [],

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
            }
        }
    },

    methods: {
        async SendMessage() {
            await saveChatMessage({
                id: this.messages.length + 1,
                name: this.user.display_name,
                surname: this.user.surname,
                content: this.newMessage.content,
                date: this.newMessage.date,
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
            //TODO
        };

        unsubscribe = subscribeToUserState(newUserState => this.user = newUserState);
    },

    async unmounted() {
        unsubscribe();
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
                    <div class="text-sm"><span class="font-bold text-emerald-600">{{ m.name }} {{ m.surname }} dijo:</span></div>
                    <div>{{ m.content }}</div>
                    <div class="text-xs text-gray-400">{{ m.date }}</div>
                </div>
            </div>
        </section>

        <section class="w-3/12">
            <h2 class="sr-only">Enviar un mensaje</h2>
            <form action="#" @submit.prevent="SendMessage">

                <div class="mb-4">
                    <label for="text" class="block mb-2">Mensaje</label>
                    <textarea type="text" id="text" class="w-full border rounded py-2 px-4 h-24"
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