<script>
export default {
    name: "Register",
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

        }
    }

}
</script>

<template>
    <div class="w-2xl p-6 shadow rounded">
        <form action="#" @submit.prevent="handleSubmit">
            <div class="mb-4 flex flex-col">
                <label for="email" class="mb-2">E-mail</label>
                <input type="email" name="email" id="email" class="mb-2 border-gray-300 border-2 rounded h-8"
                    v-model="user.email">
            </div>

            <div class="mb-4 flex flex-col">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" class="mb-2 border-gray-300 border-2 rounded h-8"
                    v-model="user.password">
            </div>
            <button type="submit"
                class="transition py-2 px-4 rounded bg-emerald-700 hover:bg-emerald-500 focus:bg-emerald-500 text-white w-full">
                Crear cuenta
            </button>
        </form>
    </div>

</template>
