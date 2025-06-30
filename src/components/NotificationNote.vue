<script>
export default {
  name: "NotificationNote",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div
    class="rounded flex items-center justify-between gap-2 px-4 py-2 mb-4"
    :class="{
      'text-green-600 bg-green-100': type === 'success',
      'text-red-600 bg-red-100': type === 'error',
    }"
  >
    <div>
      <font-awesome-icon
        :icon="
          type === 'success' ? ['fas', 'circle-check'] : ['fas', 'triangle-exclamation']
        "
        class="mr-2"
      />
      <slot />
    </div>

    <div>
      <button class="text-2xl hover:opacity-70 hover:cursor-pointer font-bold pb-1" @click="$emit('close')">&times;</button>
    </div>
  </div>
</template>
