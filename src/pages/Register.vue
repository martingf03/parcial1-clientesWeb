<script>
import RegisterSection from '../components/auth/RegisterSection.vue';
import MainH1 from '../components/MainH1.vue';
export default {
    name: "Register",
    components: { MainH1, RegisterSection },
}
</script>

<template>
    <MainH1>Registrarse</MainH1>
    <RegisterSection />
</template>