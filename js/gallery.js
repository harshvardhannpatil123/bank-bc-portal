import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const CLOUD_NAME = "dyc6simaz";
const UPLOAD_PRESET = "bankbc_upload";

const galleryCollection = collection(db, "gallery");

const uploadBtn = document.getElementById("uploadGalleryBtn");
const titleInput = document.getElementById("galleryTitle");
const imageInput = document.getElementById("galleryImage");
const galleryList = document.getElementById("galleryList");

if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    const file = imageInput.files[0];
    const title = titleInput.value.trim();

    if (!file) {
      alert("Please choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();

      await addDoc(galleryCollection, {
  title: title || "Untitled",
  imageUrl: result.secure_url,
  date: new Date().toLocaleDateString("en-IN"),
  createdAt: new Date()
});

      alert("Image uploaded successfully!");

      titleInput.value = "";
      imageInput.value = "";

      loadGallery();

    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  });
}

async function loadGallery() {
  if (!galleryList) return;

  galleryList.innerHTML = "";

  const q = query(galleryCollection, orderBy("date", "desc"));
const snapshot = await getDocs(q);

  snapshot.forEach((docItem) => {
    const data = docItem.data();

    galleryList.innerHTML += `
<div class="gallery-card">
    <img
    src="${data.imageUrl}"
    alt="${data.title || 'Gallery Image'}"
    onclick="openImage('${data.imageUrl}')"
>

    ${uploadBtn ? `
<button class="delete-btn" onclick="deleteGalleryImage('${docItem.id}')">
    Delete
</button>
` : ""}
</div>
`;
  });
}

loadGallery();
async function deleteGalleryImage(id) {
  const confirmDelete = confirm("Delete this image?");

  if (!confirmDelete) return;

  try {
    await deleteDoc(doc(db, "gallery", id));

    alert("Image deleted successfully!");

    loadGallery();

  } catch (err) {
    console.error(err);
    alert("Failed to delete image.");
  }
}

window.deleteGalleryImage = deleteGalleryImage;
function openImage(url){
    document.getElementById("imageModal").style.display="flex";
    document.getElementById("modalImage").src=url;
}

document.getElementById("closeImage").onclick=function(){
    document.getElementById("imageModal").style.display="none";
};

window.openImage=openImage;