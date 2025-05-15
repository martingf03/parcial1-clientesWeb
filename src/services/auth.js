import supabase from "./supabase";

export async function register(email, password) {
   const { data, error } = await supabase.auth.signUp({
      email,
      password
   });

   if (error) {
      console.error("[auth.js register] Error al crear la cuenta: ", error);
      throw error;
   }

   console.log("Usuario registrado: ", data);
}

export async function login(email, password) {
   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
   })

   if (error) {
      console.error("[auth.js register] Error al crear la cuenta: ", error);
      throw error;
   }

   console.log("Sesión iniciada por usuario: ", data);

}

export async function logout(email, password) {

}



