<script>

import { subscribeToUserState } from '../../services/auth';

export default {
    name: "MyProfileEditSection",
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
                surname: null
            }
        }
    },

    mounted() {
        subscribeToUserState(newUserState => this.user = newUserState);
    }

}
</script>

<template>
    <section class="p-3">
        <form action="#">
            
        </form>
    </section>
</template>