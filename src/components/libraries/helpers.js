const EXT_MIME_MAP = {
    "image/jpeg": "jpg",
    "image/pjpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/avif": "avif",
}

export function getExtensionFromFile(file) {
    return EXT_MIME_MAP[file.type] || "";
}

export function randomProfilePhotoGenerator(name, surname) {
    const fullNameFormat = `${name}+${surname}`;
    const photoURL = `https://ui-avatars.com/api/?name=${fullNameFormat}&background=random&size=300`;

    return photoURL;
}