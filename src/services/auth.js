import supabase from "./supabase";

let user = {
   id: null,
   email: null
}

let observers = [];


export async function register(email, password) {
   const { data, error } = await supabase.auth.signUp({
      email,
      password
   });

   if (error) {
      console.error("[auth.js register] Error al crear la cuenta: ", error);
      throw error;
   }

   user = {
      ...user,
      id: data.user.id,
      email: data.user.email,
   }

   notifyAll();

}

export async function login(email, password) {
   const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
   })

   if (error) {
      console.error("[auth.js login] Error al crear la cuenta: ", error);
      throw error;
   }

   user = {
      ...user,
      id: data.user.id,
      email: data.user.email,
   }

   notifyAll();

   console.log(user);
   return data.user;
}

export async function logout() {
   supabase.auth.signOut();

   user = {
      ...user,
      id: null,
      email: null,
   }

   notifyAll();
}


export function subscribeToUserState(callback) {
   observers.push(callback);

   notify(callback);
}

function notify(callback) {
   callback({...user});
}

function notifyAll() {
   observers.forEach(callback => notify(callback));
}