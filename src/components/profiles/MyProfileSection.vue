<script>
import { subscribeToUserState } from "../../services/auth";
import ProfileLoader from "../loaders/ProfileLoader.vue";
import UserProfileData from "./UserProfileData.vue";

let unsubscribe = () => {};

export default {
  name: "MyProfileSection",
  components: { ProfileLoader, UserProfileData },
  data() {
    return {
      user: {
        id: null,
        email: null,
        bio: null,
        display_name: null,
        career: null,
        surname: null,
        photo: null,
      },
      loading: false,
    };
  },

  mounted() {
    unsubscribe = subscribeToUserState(
      (newUserState) => (this.user = newUserState)
    );
  },

  unmounted() {
    unsubscribe();
  },
};
</script>

<template>
  <section class="p-3 mb-5" v-if="!loading">
    <UserProfileData :user="user" />
  </section>
  <div
    v-else
    class="flex justify-center items-center p-16 rounded shadow w-5xl"
  >
    <ProfileLoader />
  </div>
</template>
