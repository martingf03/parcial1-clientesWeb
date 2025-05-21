import supabase from "./supabase";

/**
 * Crea un nuevo perfil de usuario en la base de datos.
 *
 * @async
 * @param {{ id: string, email: string, display_name?: string, bio?: string, career?: string, surname?: string }} data - Datos del nuevo perfil.
 * @throws {Error} Si ocurre un error al crear el perfil.
 */
export async function createUserProfile(data) {
    const { error } = await supabase
    .from("user_profiles")
    .insert(data);

    if(error) {
        console.error("[user-profiles.js createUserProfile] Error al crear el perfil del usuario: ", error);
        throw error;
    }
}

/**
 * Actualiza un perfil de usuario existente en la base de datos.
 *
 * @async
 * @param {string} id - ID del usuario a actualizar.
 * @param {{ display_name?: string, bio?: string, career?: string, surname?: string }} data - Campos del perfil a actualizar.
 * @throws {Error} Si ocurre un error al actualizar el perfil.
 */
export async function updateUserProfile(id, data) {
    const { error } = await supabase
    .from("user_profiles")
    .update(data)
    .eq("id", id);

    if(error) {
        console.error("[user-profiles.js updateUserProfile] Error al actualizar el perfil del usuario: ", error);
        throw error;
    }
}

/**
 * Obtiene un perfil de usuario por su ID.
 *
 * @async
 * @param {string} id - ID del usuario.
 * @returns {Promise<Object>} Datos del perfil del usuario.
 * @throws {Error} Si ocurre un error al obtener el perfil.
 */
export async function getUserProfileById (id) {
    const { data, error } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", id);

    if(error) {
        console.error("[user-profiles.js getUserProfileById] Error al traer el perfil del usuario: ", error);
        throw error;
    }

    return data[0];
}