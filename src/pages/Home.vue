<script>
    import MainH1 from '../components/MainH1.vue';
import GeneralPostsSection from '../components/posts/GeneralPostsSection.vue';
    export default {
        name: "Home",
        components: { MainH1, GeneralPostsSection },
    }
</script>

<template>
    <section class="flex flex-col justify-center items-center my-4 border-b-4 border-emerald-500 pb-8">
        <MainH1>Bienvenidos a Echo Social</MainH1>
        <p class="text-center mt-4">Acá podés postear lo que te gusta, ver qué comparten los demás y comentar en tiempo real. Conectá, expresate y hacé que tu voz se escuche. ¡Este lugar es tuyo!</p>
    </section>
    <section class="flex flex-col justify-center">
        <GeneralPostsSection />
    </section>
</template>