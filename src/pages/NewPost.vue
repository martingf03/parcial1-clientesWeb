<script>
import BackButton from "../components/BackButton.vue";
import MainH1 from "../components/MainH1.vue";
import NewPostSection from "../components/posts/NewPostSection.vue";

export default {
  name: "NewPost",
  components: { MainH1, NewPostSection, BackButton },
};
</script>

<template>
  <div class="flex items-center gap-4">
    <BackButton class="mb-4" to="/mis-publicaciones" />
    <MainH1>Nueva publicación</MainH1>
  </div>
  <NewPostSection />
</template>
