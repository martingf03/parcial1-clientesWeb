<script>
    import MainH1 from '../components/MainH1.vue';
import GeneralPostsSection from '../components/posts/GeneralPostsSection.vue';
    export default {
        name: "Home",
        components: { MainH1, GeneralPostsSection },
    }
</script>

<template>
    <section class="flex flex-col justify-center items-center mb-4 border-b-4 border-emerald-500 pb-8 w-4xl mx-auto">
        <img src="/img/home_logo.png" alt="Logo de Link Campus" class="block w-32 mt-4 mb-8">
        <MainH1>Bienvenidos a Link Campus</MainH1>
        <p class="text-center w-3xl">Acá podés postear lo que te gusta, ver qué comparten los demás y comentar en tiempo real. Conectá, expresate y hacé que tu voz se escuche.</p>
    </section>
    <section class="flex flex-col justify-center">
        <GeneralPostsSection />
    </section>
</template>