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
            content: data.content
        });
        if(error) {
            console.error("[chat-service.js saveChatMessage] Error al insertar el registro: ", error);
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
