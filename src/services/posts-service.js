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

export async function suscribeToPostsChannel(callback) {
    const postsChannel = supabase
    .channel("posts",
        {
            config: {
                broadcast: {
                    self: true,
                }
            }
        }
    );

    postsChannel.on(
        "postgres_changes", 
        {
            event: "INSERT",
            schema: "public",
            table: "posts"
        }, 
        data => {
            callback(data.new);
        }
    );
    postsChannel.subscribe();
};

export async function loadPostsFromDB() {
    const {data, error} = await supabase
    .from("posts")
    .select();

    if(error) {
        console.error("[posts-service.js loadPostsFromDB] Error al traer las publicaciones de la base de datos: ", error);
        throw error;
    }

    return data;
}

export async function loadPostsByUser(user_id) {
    const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("user_id", user_id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[posts-service.js loadPostsByUser] Error al traer las publicaciones del usuario: ", error);
        throw error;
    }

    return data;
}
