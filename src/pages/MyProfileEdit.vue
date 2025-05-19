<script>
import BackButton from "../components/BackButton.vue";
import MainH1 from "../components/MainH1.vue";
import MyProfileEditSection from "../components/profiles/MyProfileEditSection.vue";

export default {
    name: "MyProfileEdit",
    components: { MainH1, MyProfileEditSection, BackButton },
}
</script>

<template>
    <div class="flex items-center gap-4">
        <BackButton class="mb-4" to="/mi-perfil" />
        <MainH1>Editar mi perfil</MainH1>
    </div>
    <MyProfileEditSection />
</template>