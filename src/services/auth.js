import supabase from "./supabase";

let user = {
   id: null,
   email: null
}

let observers = [];

loadInitialUserState();

async function loadInitialUserState() {
   const { data } = await supabase.auth.getUser();

   if (!data.user) return;

   updateUser({
      id: data.user.id,
      email: data.user.email,
   });
}

export async function register(email, password) {
   const { data, error } = await supabase.auth.signUp({
      email,
      password
   });

   if (error) {
      console.error("[auth.js register] Error al crear la cuenta: ", error);
      throw error;
   }

   updateUser({
      id: data.user.id,
      email: data.user.email,
   });

   console.info("Se registró un nuevo usuario con e-mail", data.user.email);

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

   updateUser({
      id: data.user.id,
      email: data.user.email,
   });

   console.info("Sesión iniciada por", user.email)

   return data.user;
}

export async function logout() {
   supabase.auth.signOut();
   let logueado = user.email;
   updateUser({
      id: null,
      email: null,
   });


   console.info("Se cerró la sesión de", logueado);

   logueado = null;
}


export function subscribeToUserState(callback) {
   observers.push(callback);

   notify(callback);
}

function notify(callback) {
   callback({ ...user });
}

function notifyAll() {
   observers.forEach(callback => notify(callback));
}

function updateUser(data) {
   user = {
      ...user,
      ...data,
   }
   notifyAll();
}