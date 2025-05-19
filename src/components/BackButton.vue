<script>
  export default {
    name: "BackButton",
    props: {
      to: {
        type: String,
        required: true,
      }
    }
  }
</script>

<template>
  <button
   @click="$router.push(to)"
    class="transition py-2 px-4 rounded border border-emerald-700 hover:bg-emerald-700 focus:bg-emerald-700 text-emerald-700 hover:text-white focus:text-white hover:border-white focus:border-white cursor-pointer"
  >
   <font-awesome-icon :icon="['fas', 'left-long']" />
   Volver
  </button>
</template>
