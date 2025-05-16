<script>
import MainH1 from "../components/MainH1.vue";
import MyProfileSection from "../components/profiles/MyProfileSection.vue";

export default {
    name: "MyProfile",
    components: { MainH1, MyProfileSection },
}
</script>

<template>
    <MainH1>Mi perfil</MainH1>
    <MyProfileSection />
</template>