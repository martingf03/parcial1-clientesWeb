<script>
import ButtonLoader from "./loaders/ButtonLoader.vue";

export default {
  name: "MainButton",
  components: {
    ButtonLoader,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: "Cargando",
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<template>
  <button
    v-if="!loading"
    :type="type"
    class="transition py-2 px-4 rounded flex items-center justify-center gap-2 cursor-pointer bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 text-white"
  >
    <slot />
  </button>

  <button
    v-else
    :type="type"
    disabled
    class="transition py-2 px-4 rounded flex items-center justify-center gap-2 bg-gray-200 text-gray-400"
  >
    <span>{{ loadingText }}</span>
    <ButtonLoader />
  </button>
</template>
