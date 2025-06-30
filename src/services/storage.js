import supabase from "./supabase";

/**
 * Sube un archivo al bucket que se especifique, en Supabase Storage.
 *
 * @async
 * @param {string} name - Nombre con el que se guardará el archivo (incluye carpeta si aplica).
 * @param {File} file - Archivo a subir.
 * @param {string} bucket - Nombre del bucket de Supabase donde se subirá el archivo.
 * @throws {Error} Si ocurre un error durante la subida del archivo.
 */
export async function uploadFile(name, file, bucket) {
    const { data, error } = await supabase.storage.from(bucket).upload(name, file);
    if(error) {
        console.error("[storage.js uploadFile] Error al subir el archivo: ", error);
        throw error;        
    }
}

/**
 * Obtiene la URL pública de un archivo en Supabase Storage.
 *
 * @param {string} filename - Nombre del archivo (incluye carpeta si aplica).
 * @param {string} bucket - Nombre del bucket donde está almacenado el archivo.
 * @returns {string} URL pública del archivo.
 */

export function getFileURL(filename, bucket) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
    return data.publicUrl;
}

/**
 * Elimina un archivo del bucket que se especifique, en Supabase Storage.
 *
 * @async
 * @param {string} filename - Nombre del archivo a eliminar (incluye carpeta si aplica).
 * @param {string} bucket - Nombre del bucket de Supabase.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
export async function deleteFile(filename, bucket) {
    const { error } = await supabase.storage.from(bucket).remove([filename]);
    if(error) {
        console.error("[storage.js deleteFile] Error al eliminar el archivo", error);
        throw error;
    }
}