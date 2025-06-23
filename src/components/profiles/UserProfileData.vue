<script>

export default {
  name: "UserProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
    <div class="flex justify-center mb-8 gap-8 w-full">
      <div v-if="user.photo || user.display_name" class="w-72 h-72 min-w-72 min-h-72 overflow-hidden">
        <img
          :src="user.photo"
          alt="Foto de perfil"
          class="w-full h-full object-cover rounded border shadow-md shadow-gray-400"
        />
      </div>
      <div class="flex flex-col p-8 shadow rounded bg-emerald-50 w-200 h-72 overflow-auto justify-start">
        <h2 class="font-bold text-2xl mb-2">Biografía</h2>
        <p class="italic font-light text-emerald-800 ms-8">
          {{ user.bio || "Aún no se escribió la biografía..." }}
        </p>
      </div>
    </div>

    <div class="flex gap-40 justify-center">
      <div>
        <h2 class="font-bold text-2xl mb-2">Email</h2>
        <p>{{ user.email }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Nombre</h2>
        <p>{{ user.display_name || "Sin especificar" }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Apellido</h2>
        <p>{{ user.surname || "Sin especificar" }}</p>
      </div>
      <div>
        <h2 class="font-bold text-2xl mb-2">Carrera</h2>
        <p>{{ user.career || "Sin especificar" }}</p>
      </div>
    </div>
</template>
