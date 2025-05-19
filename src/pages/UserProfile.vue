<script>
import MainH1 from '../components/MainH1.vue';
import UserProfileSection from '../components/profiles/UserProfileSection.vue';
export default {
    name: "UserProfile",
    components: { MainH1, UserProfileSection },
    data() {
        return {
            name: "",
            surname: "",
        };
    },
    methods: {
        handleUserData({display_name, surname}) {
            this.name = display_name;
            this.surname = surname;
        },
    },
};

</script>

<template>
    <div class="flex flex-col items-center mt-4">
        <MainH1>Perfil de {{ name }} {{ surname }}</MainH1>
        <UserProfileSection @user-loaded="handleUserData" />
    </div>
</template>