<script>
import MainH1 from "../components/MainH1.vue";
export default {
  name: "Chat",
  components: { MainH1 },
};
</script>

<template>
  <MainH1>Chat global</MainH1>
  <div class="flex gap-4">
    <section class="w-9/12">
      <h2 class="sr-only">Lista de mensajes</h2>
      <div class="min-h-[400px] p-4 border rounded">
        <!-- mensajes -->
      </div>
    </section>
    <section class="w-3/12">
      <h2 class="mb-4 text-lg font-bold">Enviar un mensaje</h2>
      <form action="#">
        <div class="mb-4">
          <label for="user" class="block mb-2">Nombre de usuario</label>
          <input type="text" id="user" class="w-full border rounded py-2 px-4">
        </div>
        <div class="mb-4">
          <label for="text" class="block mb-2">Mensaje</label>
          <textarea type="text" id="text" class="w-full border rounded py-2 px-4"></textarea>
        </div>
        <button 
          type="sumbit" 
          class="py-2 px-4 rounded bg-emerald-700 text-white"
        >
          Enviar
        </button>
      </form>
    </section>
  </div>
</template>
