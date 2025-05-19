import supabase from './supabase';

export async function savePost(data) {
    const { error } = await supabase
    .from("posts")
    .insert({
        user_id: data.user_id,
        content: data.content,
    });
    if(error) {
        console.error("[posts-service.js savePost] Error al insertar la publicació en la base de datos: ", error);
        throw error;
    }
};

