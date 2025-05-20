import supabase from "./supabase";

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

export async function loadCommentByPost(post_id) {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
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
