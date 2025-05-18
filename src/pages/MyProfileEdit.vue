<script>
import MainH1 from "../components/MainH1.vue";
import MyProfileEditSection from "../components/profiles/MyProfileEditSection.vue";

export default {
    name: "MyProfileEdit",
    components: { MainH1, MyProfileEditSection },
}
</script>

<template>
    <MainH1>Editar mi perfil</MainH1>
    <MyProfileEditSection />
</template>