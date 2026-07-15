import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../admin/login.html";
  }
});

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "../admin/login.html";
  });
}
import {
  updatePassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const changeBtn = document.getElementById("changePasswordBtn");

if (changeBtn) {

  changeBtn.addEventListener("click", async () => {

    const newPassword =
      document.getElementById("newPassword").value;

    const message =
      document.getElementById("passwordMessage");

    try {

      await updatePassword(auth.currentUser, newPassword);

      message.innerText =
        "Password changed successfully.";

    } catch (err) {

      message.innerText = err.message;

    }

  });

}