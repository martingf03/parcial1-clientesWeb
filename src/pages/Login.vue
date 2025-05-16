<script>
import LoginSection from "../components/auth/LoginSection.vue";
import MainH1 from "../components/MainH1.vue";
export default {
    name: "Login",
    components: { MainH1, LoginSection },
}
</script>

<template>
    <div class="flex flex-col items-center mt-4">
        <MainH1>Iniciar sesión</MainH1>
        <LoginSection />
    </div>
</template>