<script>
import Home from "./pages/Home.vue";
import Chat from "./pages/Chat.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import AppFooter from "./components/AppFooter.vue";
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    Home,
    Chat,
    Login,
    Register,
    AppFooter,
    AppNavbar,
  },

};

</script>

<template>
  <AppNavbar />
  <main class="container mx-auto px-24 py-6 font-[Lexend] bg-white shadow-lg shadow-gray-400">
    <router-view />
  </main>
  <AppFooter />
</template>
