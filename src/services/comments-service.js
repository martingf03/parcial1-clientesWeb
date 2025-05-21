import supabase from "./supabase";

/**
 * Inserta un nuevo comentario en la base de datos asociado a un post.
 * 
 * @async
 * @param {{ post_id: string, user_id: string, content: string }} - Datos del comentario.
 * @throws {Error} Si ocurre un error al insertar el comentario.
 */
export async function addComment({ post_id, user_id, content }) {
  const { error } = await supabase
    .from("comments")
    .insert([{ post_id: post_id, user_id: user_id, content: content }]);

  if (error) {
    console.error(
      "[comments-service.js addComment] Error al insertar el comentario en la base de datos: ",
      error
    );
    throw error;
  }
}

/**
 * Carga todos los comentarios de un post en orden cronológico ascendente.
 * También incluye los datos del perfil del usuario que hizo cada comentario.
 * 
 * @async
 * @param {string} post_id - ID del post del cual se quieren cargar los comentarios.
 * @returns {Promise<Array<Object>>} Lista de comentarios con información de usuario.
 * @throws {Error} Si ocurre un error al obtener los comentarios.
 */
export async function loadCommentByPost(post_id) {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      user_id,
      content,
      created_at,
      user_profiles (
        display_name,
        surname
      )
    `
    )
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(
      "[comments-service.js loadCommentByPost] Error al cargar los comentarios: ",
      error
    );
    throw error;
  }
  return data;
}

/**
 * Suscribe una función callback que se ejecuta cada vez que se inserta un nuevo comentario
 * en la tabla "comments". Filtra por ID del post.
 * 
 * @async
 * @param {string} post_id - ID del post al que pertenecen los comentarios.
 * @param {(comment: Object) => void} callback - Función que se ejecuta al recibir un nuevo comentario.
 */
export async function suscribeToCommentsChannel(post_id, callback) {
  const commentsChannel = supabase
  .channel(`comments:${post_id}`, 
    {
    config: {
      broadcast: {
        self: true,
      },
    },
  });

  commentsChannel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "comments",
    },
    async (payload) => {
      const completeDataComment = await addUserDataToComment(payload.new);
      if (completeDataComment) callback(completeDataComment);
    }
  );
  commentsChannel.subscribe();
}

/**
 * Agrega la información de perfil del usuario (nombre y apellido) a un comentario.
 * 
 * @async
 * @param {{ user_id: string }} comment - Objeto de comentario con "user_id".
 * @returns {Promise<Object|null>} Comentario enriquecido con datos de usuario o null si falla.
 */
async function addUserDataToComment(comment) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("display_name, surname")
    .eq("id", comment.user_id)
    .single();

  if (error) {
    console.error("[addUserDataToComment] Error al obtener el perfil:", error);
    return null;
  }

  return {
    ...comment,
    user_profiles: data,
  };
}
