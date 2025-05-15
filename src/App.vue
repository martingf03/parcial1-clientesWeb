<script>
import Home from "./pages/Home.vue";
import Chat from "./pages/Chat.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import AppFooter from "./components/AppFooter.vue";
import AppNavbar from "./components/AppNavbar.vue";
import { subscribeToUserState } from "./services/auth";

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
  <main class="container mx-auto p-4 font-[Lexend]">
    <router-view />
  </main>
  <AppFooter />
</template>
