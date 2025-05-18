import supabase from './supabase';

export async function loadChatMessagesFromDB() {
    const {data, error} = await supabase
    .from("global_chat")
    .select();

    if(error) {
        console.error("[chat-service.js loadChatMessagesFromDB] Error al traer los mensajes: ", error);
        throw error;
    }

    return data;
}

export async function saveChatMessage(data) {
    const { error } = await supabase
        .from('global_chat')
        .insert({
            name: data.name,
            surname: data.surname,
            content: data.content,
            user_id: data.user_id,
        });
        if(error) {
            console.error("[chat-service.js saveChatMessage] Error al insertar el mensaje a la base de datos: ", error);
            throw error;
        }
};

export async function suscribeToChatMessages(callback) {
    const chatChannel = supabase
    .channel("global-chat",
        {
            config: {
                broadcast: {
                    self: true,
                }
            }
        }
    );

    chatChannel.on(
        "postgres_changes", 
        {
            event: "INSERT",
            schema: "public",
            table: "global_chat"
        }, 
        data => {
            callback(data.new);
        }
    );
    chatChannel.subscribe();
};

export function formatDate(dateString) {
    const date = new Date(dateString);

    const h = date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const d = date.toLocaleDateString("es-AR");

    return `a las ${h}, el ${d}`;
}

