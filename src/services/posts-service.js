import supabase from "./supabase";

/**
 * Guarda una nueva publicación en la base de datos.
 *
 * @async
 * @param {{ user_id: string, content: string }} postData - Datos de la publicación.
 * @throws {Error} Si ocurre un error al insertar la publicación.
 */
export async function savePost(data) {
  const { error } = await supabase.from("posts").insert({
    user_id: data.user_id,
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

/**
 * Se suscribe en tiempo real a nuevas publicaciones insertadas en la tabla "posts".
 * Ejecuta el callback recibido con los datos de la nueva publicación.
 *
 * @param {(newPost: Object) => void} callback - Función que se ejecuta al recibir una nueva publicación.
 */
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
      event: "INSERT",
      schema: "public",
      table: "posts",
    },
    (data) => {
      callback(data.new);
    }
  );
  postsChannel.subscribe();
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
