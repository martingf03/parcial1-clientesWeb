<script>

import { subscribeToUserState } from '../../services/auth';

let unsubscribe = () => {};

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
        unsubscribe = subscribeToUserState(newUserState => this.user = newUserState);
    },

    unmounted() {
        unsubscribe();
    }

}
</script>

<template>
    <section class="p-3">
        <div class="flex flex-col mb-10 p-8 shadow rounded bg-emerald-50">
            <h2 class="font-bold text-2xl mb-2">Biografía</h2>
            <p class="italic font-light text-emerald-800 ms-8">{{ user.bio || "Aún no se escribió la biografía..." }}</p>
        </div>
        <div class="flex gap-40 items-center">
            <div>
                <h2 class="font-bold text-2xl mb-2">Email</h2>
                <p>{{ user.email }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Nombre</h2>
                <p>{{ user.display_name || "Sin especificar" }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Apellido</h2>
                <p>{{ user.surname || "Sin especificar" }}</p>
            </div>
            <div>
                <h2 class="font-bold text-2xl mb-2">Carrera</h2>
                <p>{{ user.career || "Sin especificar" }}</p>
            </div>
        </div>
    </section>
</template>