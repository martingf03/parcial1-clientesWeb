import supabase from "./supabase";
import { createUserProfile, getUserProfileById } from "./user-profiles";

let user = {
   id: null,
   email: null,
   display_name: null,
   bio: null,
   career: null,
   surname: null,
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

   await loadExtendedUserProfile(data.user.id);
}

async function loadExtendedUserProfile(userId) {
   try {
      const profileData = await getUserProfileById(userId);

      updateUser({
         display_name: profileData.display_name,
         bio: profileData.bio,
         career: profileData.career,
         surname: profileData.surname,
      });
   } catch (error) {
      console.error("[auth.js loadExtendedUserProfile] Error al traer los datos del usuario de la BD: ", error);
      throw error;
   }

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

   try {
      await createUserProfile({
         id: data.user.id,
         email
      })
   } catch (errorProfile) {
      throw errorProfile;
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

   await loadExtendedUserProfile(data.user.id);
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