<script>
import { formatDate } from "../../services/chat-service";
import Comments from "../posts/Comments.vue";
import MainButton from "../MainButton.vue";

export default {
  name: "PostCard",
  components: { MainButton, Comments },
  props: {
    user_id: String,
    display_name: String,
    surname: String,
    date: String,
    content: String,
    post_id: String,
  },
  methods: {
    formatDate,
  },
};
</script>

<template>
  <div class="w-xl rounded overflow-hidden shadow-lg bg-white border">
    <div class="px-6 py-4">
      <p class="text-gray-900 text-base mb-4">
        {{ content }}
      </p>
      <div class="text-sm text-gray-500 mb-1">
        Publicado por
        <span
          @click="$router.push(`/usuario/${user_id}`)"
          class="font-bold text-emerald-600 cursor-pointer hover:text-emerald-500 transition"
        >
          {{ display_name }} {{ surname }}
        </span>
        {{ formatDate(date) }}
      </div>

      <Comments :post_id="post_id" />
    </div>
  </div>
</template>
