import { deleteFile, getFileURL, uploadFile } from "./storage";
import supabase from "./supabase";
import {
  createUserProfile,
  getUserProfileById,
  updateUserProfile,
} from "./user-profiles";
import { getExtensionFromFile } from "../components/libraries/helpers";
import { randomProfilePhotoGenerator } from "../components/libraries/helpers";

let user = {
  id: null,
  email: null,
  display_name: null,
  bio: null,
  career: null,
  surname: null,
  photo: null,
};

let observers = [];

loadInitialUserState();

/**
 * Carga el estado inicial del usuario autenticado si existe sesión activa.
 *
 * @async
 */
async function loadInitialUserState() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) return;

  updateUser({
    id: data.user.id,
    email: data.user.email,
  });

  await loadExtendedUserProfile(data.user.id);
}

/**
 * Carga el perfil extendido del usuario desde la base de datos
 * y actualiza el estado del usuario.
 *
 * @async
 * @param {string} userId - ID del usuario.
 * @throws {Error} Si ocurre un error al obtener los datos.
 */
async function loadExtendedUserProfile(userId) {
  try {
    const profileData = await getUserProfileById(userId);

    updateUser({
      display_name: profileData.display_name,
      bio: profileData.bio,
      career: profileData.career,
      surname: profileData.surname,
      photo: profileData.photo,
    });
  } catch (error) {
    console.error(
      "[auth.js loadExtendedUserProfile] Error al traer los datos del usuario de la BD: ",
      error
    );
    throw error;
  }
}

/**
 * Registra un nuevo usuario con email y contraseña.
 * Si el registro es exitoso, lo guarda en la BBDD.
 *
 * @async
 * @param {string} email - Correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña del nuevo usuario.
 * @throws {Error} Si ocurre un error en el registro o al crear el perfil.
 */
export async function register(email, password, name, surname) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("[auth.js register] Error al crear la cuenta: ", error);
    throw error;
  }
  const firstPhoto = randomProfilePhotoGenerator(name, surname);
  try {
      await createUserProfile({
      id: data.user.id,
      email,
      display_name: name,
      surname: surname,
      photo: firstPhoto,
    });
  } catch (errorProfile) {
    throw errorProfile;
  }

  updateUser({
    id: data.user.id,
    email: data.user.email,
    display_name: name,
    surname: surname,
    photo: firstPhoto,
  });

  console.info("Se registró un nuevo usuario con e-mail", data.user.email);
}

/**
 * Inicia sesión con email y contraseña.
 * Si es exitoso, actualiza el estado del usuario.
 *
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Object} Usuario autenticado.
 * @throws {Error} Si el login falla.
 */
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("[auth.js login] Error al iniciar sesión: ", error);
    throw error;
  }

  updateUser({
    id: data.user.id,
    email: data.user.email,
  });

  console.info("Sesión iniciada por", user.email);

  await loadExtendedUserProfile(data.user.id);
  return data.user;
}

/**
 * Cierra la sesión del usuario actualmente autenticado.
 * Limpia los datos del usuario del estado global.
 *
 * @async
 */
export async function logout() {
  supabase.auth.signOut();
  let logueado = user.email;
  updateUser({
    id: null,
    email: null,
    bio: null,
    display_name: null,
    surname: null,
    career: null,
    photo: null,
  });

  console.info("Se cerró la sesión de", logueado);

  logueado = null;
}

/**
 * Actualiza el perfil del usuario autenticado en la base de datos.
 *
 * @async
 * @param {{ display_name?: string, bio?: string, career?: string, surname?: string }} data - Datos del perfil a actualizar.
 */
export async function updateAuthUserProfile(data) {
  try {
    await updateUserProfile(user.id, data);
    updateUser(data);
  } catch (error) {
    console.error(
      "[auth.js updateAuthUserProfile] Error al actualizar el perfil del usuario autenticado:",
      error
    );
  }
}

/**
 * Actualiza el email del usuario autenticado.
 *
 * @async
 * @param {{ email: string }} newEmail - Nuevo correo electrónico.
 * @returns {Object} Datos actualizados del usuario.
 * @throws {Error} Si falla la operación.
 */
export async function updateAuthEmail(newEmail) {
  const { data, error } = await supabase.auth.updateUser(newEmail);

  if (error) {
    console.error("Error actualizando email:", error);
    throw error;
  }

  return data;
}

/**
 * Actualiza la contraseña del usuario autenticado.
 *
 * @async
 * @param {string} newPassword - Nueva contraseña.
 * @returns {Object} Datos actualizados del usuario.
 * @throws {Error} Si falla la operación.
 */
export async function updateAuthPassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Error actualizando contraseña:", error);
    throw error;
  }

  return data;
}

export async function updateAuthUserAvatar(file) {
  try {
    const oldProfilePhoto = user.photo;
    const filename = `${user.id}/${crypto.randomUUID()}.${getExtensionFromFile(
      file
    )}`;
    await uploadFile(filename, file, "avatars");
    const photo = getFileURL(filename, "avatars");

    if (oldProfilePhoto) {
      const photoToDelete = oldProfilePhoto.slice(
        oldProfilePhoto.indexOf("/avatars/") + 9
      );
      deleteFile(photoToDelete, "avatars");
    }
    await updateAuthUserProfile({ photo: photo });
  } catch (error) {
    throw error;
  }
}

export async function uploadAuthUserPostPhoto(file, post_id) {
  try {
    const filename = `${user.id}/${post_id}.${getExtensionFromFile(file)}`;
    await uploadFile(filename, file, "posts.images");
    return getFileURL(filename, "posts.images")
  } catch (error) {
    throw error;
  }
}

/*
OBESERVER
*/

/**
 * Suscribe una función "observer" que se ejecutará cada vez que cambien los datos del usuario.
 * Devuelve una función para cancelar la suscripción.
 *
 * @param {({ id: string|null, email: string|null }) => void} callback - Función que recibe el nuevo estado del usuario.
 * @returns {() => void} Función para desuscribirse.
 */
export function subscribeToUserState(callback) {
  observers.push(callback);
  notify(callback);
  return () => {
    observers = observers.filter((obs) => obs !== callback);
  };
}

/**
 * Ejecuta un observer específico pasándole el estado actual del usuario.
 *
 * @param {({ id: string|null, email: string|null }) => void} callback
 */
function notify(callback) {
  callback({ ...user });
}

/**
 * Ejecuta todos los observers registrados para notificar un cambio de estado.
 */
function notifyAll() {
  observers.forEach((callback) => notify(callback));
}

/**
 * Actualiza los datos del usuario en el estado local y notifica a los observers.
 *
 * @param {{ id?: string|null, email?: string|null, display_name?: string|null, bio?: string|null, career?: string|null, surname?: string|null }} data
 */
function updateUser(data) {
  user = {
    ...user,
    ...data,
  };
  notifyAll();
}
