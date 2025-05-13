<script>
import MainH1 from "../components/MainH1.vue";
import ChatSection from "../components/chat/ChatSection.vue";

export default {
  name: "Chat",
  components: {
    MainH1,
    ChatSection
  }
}
</script>

<template>
  <MainH1>Chat global</MainH1>

  <ChatSection />
</template>
