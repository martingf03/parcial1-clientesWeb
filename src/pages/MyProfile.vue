<script>
import MainH1 from "../components/MainH1.vue";
import MyProfileSection from "../components/profiles/MyProfileSection.vue";

export default {
    name: "MyProfile",
    components: { MainH1, MyProfileSection },
}
</script>

<template>
    <div class="flex flex-col items-center mt-4">
        <MainH1>Mi perfil</MainH1>
        <router-link 
        to="/editar-mi-perfil" 
        class="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 py-2 px-4 w-40 text-center transition duration-200 ease-in-out"
        >
            Editar mi perfil
        </router-link>
    </div>
    <MyProfileSection />
</template>