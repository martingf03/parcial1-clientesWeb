import supabase from "./supabase";

export async function uploadFile(name, file, bucket) {
    const { data, error } = await supabase.storage.from(bucket).upload(name, file);
    if(error) {
        console.error("[storage.js uploadFile] Error al subir el archivo: ", error);
        throw error;        
    }
}

export function getFileURL(filename, bucket) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    return data.publicUrl;
}

// export async function deleteFile(filename, bucket) {
    
// }