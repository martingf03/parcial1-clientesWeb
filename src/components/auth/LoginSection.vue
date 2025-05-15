<script>
import { login } from '../../services/auth';

export default {
    name: "Login",
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        }
    },

    methods: {
        async handleSubmit() {
            try {
                await login(this.user.email, this.user.password)
            } catch (error) {
                // MANEJAR
            }
        }
    }

}
</script>

<template>
    <div class="w-2xl p-6 shadow rounded">
        <form action="#" @submit.prevent="handleSubmit">
            <div class="mb-4 flex flex-col">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="email" class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
                    v-model="user.email">
            </div>

            <div class="mb-4 flex flex-col">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" class="mb-2 p-2 border-gray-300 border-2 rounded h-8"
                    v-model="user.password">
            </div>
            <button type="submit"
                class="transition py-2 px-4 rounded bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 text-white w-full">
                Iniciar sesión
            </button>
        </form>
    </div>

</template>