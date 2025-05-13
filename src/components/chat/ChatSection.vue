<script>

export default {
    name: "Chat",
    
    data() {
        return {
            messages: [],                

            newMessage: {
                email: "",
                content: "",
            }
        }
    },

    methods: {
        SendMessage() {
            this.messages.push({
                email: this.newMessage.email,
                content: this.newMessage.content,
            });
            this.newMessage.content = "";
        }
    }
};
</script>

<template>
  <div class="flex gap-4">

    <section class="w-9/12">
      <h2 class="sr-only">Lista de mensajes</h2>
      <div class="min-h-[400px] p-4 border rounded">
        <div v-for="m in messages" class="mb-4">
          <div class="text-sm"><span class="font-bold">{{ m.email }} dijo:</span></div>
          <div>{{ m.content }}</div>
        </div>
      </div>
    </section>
    
    <section class="w-3/12">
      <h2 class="mb-4 text-lg font-bold">Enviar un mensaje</h2>
      <form 
      action="#"
      @submit.prevent="SendMessage"
      >
        <div class="mb-4">
          <label for="user" class="block mb-2">Nombre de usuario</label>
          <input 
          type="text" 
          id="user" 
          class="w-full border rounded py-2 px-4"
          v-model="newMessage.email"
          >
        </div>
        <div class="mb-4">
          <label for="text" class="block mb-2">Mensaje</label>
          <textarea 
          type="text" 
          id="text" 
          class="w-full border rounded py-2 px-4"
          v-model="newMessage.content"
          >
        </textarea>
        </div>
        <button type="sumbit" class="py-2 px-4 rounded bg-emerald-700 text-white">
          Enviar
        </button>
      </form>
    </section>
  </div>
</template>