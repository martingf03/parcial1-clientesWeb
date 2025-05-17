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
        <div class="flex flex-col mb-10">
            <h2 class="font-bold text-2xl mb-2">Biografía</h2>
            <p class="italic font-light">{{ user.bio || "Acá va mi biografía" }}</p>
        </div>
        <div class="flex gap-40 items-center">
            <div>
                <h2 class="font-bold text-2xl mb-2">Email</h2>
                <p>{{ user.email }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Nombre</h2>
                <p>{{ user.display_name || "Acá va mi nombre" }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Apellido</h2>
                <p>{{ user.surname || "Acá va mi apellido" }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Carrera</h2>
                <p>{{ user.career || "Acá va mi carrera" }}</p>
            </div>
        </div>
    </section>
</template>