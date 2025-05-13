import supabase from './supabase';

const canalChat = supabase.channel("globalChat", {
    config: {
        broadcast: { self: true },
    }
});

export async function saveChatMessage(data) {
    const res = await canalChat.send({
        type: "broadcast",
        event: "newMessage",
        payload: {
            ...data,
        }
    });
}

export async function suscribeToChatMessages(callback) {
            canalChat.on(
            "broadcast",
            {
                event: "newMessage",
            },
            data => {
                console.log("datos recibidos en tiempo real: ", data);
                callback(data.payload);
            }
        );

        canalChat.subscribe();
}