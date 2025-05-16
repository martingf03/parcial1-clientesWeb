<script>

import { subscribeToUserState } from '../../services/auth';

export default {
    name: "MyProfileSection",
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
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
        <div class="flex flex-col mb-4">
            <h2 class="font-bold text-2xl mb-2">Biografía</h2>
            <p class="italic">{{ user.bio }}</p>
        </div>
        <div class="flex gap-64 items-center">
            <div>
                <h2 class="font-bold text-2xl mb-2">Email</h2>
                <p>{{ user.email }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Nombre de usuario</h2>
                <p>{{ user.display_name }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Carrera</h2>
                <p>{{ user.career }}</p>
            </div>
        </div>
    </section>
</template>