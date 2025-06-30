<script>
import MainH1 from "../components/MainH1.vue";
import MyPostsSection from "../components/posts/MyPostsSection.vue";

export default {
  name: "MyPosts",
  components: { MainH1, MyPostsSection },
};
</script>

<template>
  <div>
    <div class="flex flex-col justify-center items-center my-4">
      <MainH1>Mis publicaciones</MainH1>
      <router-link
        to="/mis-publicaciones/nuevo-post"
        class="rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 py-2 px-4 text-center transition duration-200 ease-in-out w-fit my-4"
      >
        Crear nueva publicación
      </router-link>
    </div>
    <MyPostsSection />
  </div>
</template>
