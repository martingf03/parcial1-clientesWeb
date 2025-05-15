<script>
import LoginSection from "../components/auth/LoginSection.vue";
import MainH1 from "../components/MainH1.vue";
export default {
    name: "Login",
    components: { MainH1, LoginSection },
}
</script>

<template>
    <MainH1>Iniciar sesión</MainH1>
    <LoginSection />
</template>