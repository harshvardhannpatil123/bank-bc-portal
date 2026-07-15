const CLOUDINARY_CLOUD_NAME = "dyc6simaz";
const CLOUDINARY_UPLOAD_PRESET = "bankbc_upload";

async function uploadImage(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
    }

    return data.secure_url;
}