import supabase from './supabase';

/**
 * Carga todos los mensajes existentes del chat global desde la base de datos.
 * 
 * @async
 * @returns {Promise<Array<Object>>} Lista de mensajes.
 * @throws {Error} Si ocurre un error al obtener los mensajes.
 */
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

/**
 * Guarda un nuevo mensaje en la tabla "global_chat" de la base de datos.
 * 
 * @async
 * @param {{ name: string, surname: string, content: string, user_id: string }} data - Datos del mensaje.
 * @throws {Error} Si ocurre un error al insertar el mensaje.
 */
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

/**
 * Suscribe una función callback que se ejecuta cada vez que se inserta un nuevo mensaje en la tabla "global_chat".
 * 
 * @param {(message: Object) => void} callback - Función que se ejecuta al recibir un nuevo mensaje.
 */
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

/**
 * Recibe una fecha en formato string y la transforma.
 * 
 * @param {string} dateString - Fecha como la registra Supabase.
 * @returns {string} Fecha formateada.
 */
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

