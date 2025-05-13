<script>
export default {
  name: "AppNavbar",
};
</script>

<template>
  <nav class="bg-emerald-400 border-b-4 border-b-emerald-500">
    <ul class="flex items-center gap-8 p-4 font-[Lexend] text-lg">
      <li class="hover:text-white transition duration-200 ease-in-out">
        <router-link to="/">Home</router-link>
      </li>
      <li class="hover:text-white transition duration-200 ease-in-out">
        <router-link to="/chat">Chat</router-link>
      </li>
      <li class="hover:text-white transition duration-200 ease-in-out">
        <router-link to="/registro">Registro</router-link>
      </li>
      <li class="hover:text-white transition duration-200 ease-in-out">
        <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
      </li>
    </ul>
  </nav>
</template>
