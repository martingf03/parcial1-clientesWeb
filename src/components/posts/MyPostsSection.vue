<script>
export default {
  name: "MyPostsSection",
  data() {
    return {
      loadingPosts: true,
    };
  },
};
</script>

<template>
  <section>
    <h2 class="sr-only">Lista de mis publicaciones</h2>
    <div
      ref="postsContainer"
      class="my-8 flex justify-center items-center"
    >
      Acá se mostrarán las publicaciones...
    </div>
  </section>
</template>
