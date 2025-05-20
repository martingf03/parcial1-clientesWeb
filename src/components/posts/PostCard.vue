<script>
import { formatDate } from "../../services/chat-service";

export default {
  name: "PostCard",
  props: {
    user_id: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // imageUrl: {
    //     type: String,
    //     default: null
    // }
  },
  methods: {
    formatDate,
  },
};
</script>

<template>
  <div class="max-w-md rounded overflow-hidden shadow-lg bg-white border">
    <!-- <img
      v-if="imageUrl"
      class="w-full"
      :src="imageUrl"
      alt="Imagen del post"
    /> -->

    <div class="px-6 py-4">
      <p class="text-gray-800 text-base whitespace-pre-wrap">
        {{ content }}
      </p>
      <div
        class="text-sm text-gray-500 mb-1"
      >
        Publicado por
        <span
            @click="$router.push(`/usuario/${user_id}`)"
          class="font-bold text-emerald-600 cursor-pointer hover:text-emerald-500 transition"
        >
          {{ display_name }} {{ surname }}
        </span>
        {{ formatDate(date) }}
      </div>
    </div>
  </div>
</template>
