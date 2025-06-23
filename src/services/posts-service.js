import supabase from "./supabase";
import { deleteFile } from "./storage";

/**
 * Guarda una nueva publicación en la base de datos.
 *
 * @async
 * @param {{ user_id: string, content: string }} postData - Datos de la publicación.
 * @throws {Error} Si ocurre un error al insertar la publicación.
 */
export async function savePost(data) {
  const { error } = await supabase
  .from("posts")
  .insert({
    id: data.id,
    user_id: data.user_id,
    file_url: data.file_url,
    content: data.content,
  });
  if (error) {
    console.error(
      "[posts-service.js savePost] Error al insertar la publicación en la base de datos: ",
      error
    );
    throw error;
  }
}

export async function suscribeToPostsChannel(callback) {
  const postsChannel = supabase.channel("posts", {
    config: {
      broadcast: {
        self: true,
      },
    },
  });

  postsChannel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "posts",
    },
    async (data) => {
      const { eventType, new: newPost, old: oldPost } = data;
      if (eventType === "DELETE") {
        callback({ ...oldPost, isDeleted: true });
      } else {
        const postWithUser = await addUserDataToPost(newPost);
        callback(postWithUser);
      }
    }
  );
  postsChannel.subscribe();
}

/**
 * Enlaza los datos del perfil de usuario a un post.
 *
 * @param {Object} post - El post sin datos de usuario.
 * @returns {Promise<Object>} El post con display_name y surname.
 */
export async function addUserDataToPost(post) {
  const { data: user, error } = await supabase
    .from("user_profiles")
    .select("display_name, surname")
    .eq("id", post.user_id)
    .single();

  if (error) {
    console.error("Error cargando user_profiles para post:", error);
    return post;
  }

  return {
    ...post,
    user_profiles: user,
  };
}

/**
 * Carga todas las publicaciones de la base de datos.
 * Incluye información del usuario asociado a cada post.
 *
 * @async
 * @returns {Promise<Array>} Lista de publicaciones con datos de usuario.
 * @throws {Error} Si ocurre un error al obtener las publicaciones.
 */
export async function loadPostsFromDB() {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      file_url,
      content,
      created_at,
      user_id,
      user_profiles (
        display_name,
        surname
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "[posts-service.js loadPostsFromDB] Error al traer las publicaciones de la base de datos: ",
      error
    );
    throw error;
  }

  return data;
}

/**
 * Carga todas las publicaciones de un usuario específico.
 *
 * @async
 * @param {string} user_id - ID del usuario.
 * @returns {Promise<Array>} Lista de publicaciones del usuario.
 * @throws {Error} Si ocurre un error al obtener las publicaciones.
 */
export async function loadPostsByUser(user_id) {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "[posts-service.js loadPostsByUser] Error al traer las publicaciones del usuario: ",
      error
    );
    throw error;
  }

  return data;
}

/**
 * Actualiza el contenido de una publicación.
 * @async
 * @param {string} post_id - ID de la publicación.
 * @param {string} content - Nuevo contenido de la publicación.
 * @throws {Error} Si ocurre un error al actualizar la publicación.
 */
export async function editPost(post_id, content) {
  const { error } = await supabase
    .from("posts")
    .update({ content: content })
    .eq("id", post_id);

  if (error) {
    console.error(
      "[posts-service.js updatePost] Error al actualizar la publicación: ",
      error
    );
    throw error;
  }
}

/**
 * Elimina una publicación y su imagen asociada en Supabase Storage.
 *
 * @async
 * @function deletePost
 * @param {string} post_id - ID de la publicación a eliminar.
 * @param {string} file_url - URL pública del archivo en Supabase Storage.
 * @throws {Error} Si ocurre un error al eliminar la imagen o la publicación.
 */
export async function deletePost(post_id, file_url) {
  try {
    const filePath = file_url.slice(file_url.indexOf("/posts.images/") + 14);
    deleteFile(filePath, "posts.images");
  } catch (error) {
    console.error("[posts-service.js deletePost] Error al eliminar la imagen de storage:", error);
    throw error;
  }

  const { error } = await supabase
  .from("posts")
  .delete()
  .eq("id", post_id);

  if (error) {
    console.error(
      "[posts-service.js deletePost] Error al eliminar la publicación: ",
      error
    );
    throw error;
  }
}
