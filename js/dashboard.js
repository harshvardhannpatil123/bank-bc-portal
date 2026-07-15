import { db } from "./firebase.js";
import {
    doc,
    getDoc,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// =========================
// SS Drug House BC Portal
// Dashboard
// =========================

const refreshBtn = document.getElementById("refreshBtn");
const themeBtn = document.getElementById("themeBtn");
const sidebar = document.querySelector(".sidebar");

let darkMode = false;

// Refresh Dashboard
refreshBtn.addEventListener("click", () => {
    location.reload();
});

// Dark Mode
themeBtn.addEventListener("click", () => {

    darkMode = !darkMode;

    document.body.classList.toggle("dark");

    themeBtn.innerHTML = darkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

});

// Sidebar Toggle (for future mobile menu)

function toggleSidebar(){

    sidebar.classList.toggle("show");

}

console.log("Dashboard Loaded Successfully");
// Load BC Status and Notice from Firestore
async function loadStatus() {
    try {
        const statusRef = doc(db, "status", "current");
        const statusSnap = await getDoc(statusRef);

        if (statusSnap.exists()) {
            const data = statusSnap.data();

            const statusTitle = document.getElementById("currentStatus");
            const noticeBox = document.getElementById("todayNotice");
            const messageBox = document.getElementById("serviceMessage");

            if (statusTitle) {
                statusTitle.textContent = data.status || "";
            }

            if (noticeBox) {
                noticeBox.value = data.notice || "";
                
            }
            if (messageBox) {
    messageBox.value = data.message || "";
}
        }
    } catch (err) {
        console.error("Error loading status:", err);
    }
}

loadStatus();

const statusRef = doc(db, "status", "current");
document.getElementById("saveNoticeBtn").addEventListener("click", async () => {
    const notice = document.getElementById("todayNotice").value;

    await updateDoc(statusRef, {
    notice: notice,
    lastUpdated: new Date().toLocaleString("en-IN")
});

    await loadStatus();
alert("Notice saved successfully!");
});   // <-- ADD THIS LINE
document.getElementById("saveMessageBtn").addEventListener("click", async () => {
    const message = document.getElementById("serviceMessage").value;

    await updateDoc(statusRef, {
    message: message,
    lastUpdated: new Date().toLocaleString("en-IN")
});

    await loadStatus();

    alert("Service message updated successfully!");
});
document.getElementById("saveStatusBtn").addEventListener("click", async () => {
    const newStatus = document.getElementById("statusSelect").value;
    let message = "";

switch (newStatus) {
  case "All Services Available":
    message = "🏦 All Banking Services Available Today 📢 ⏰ Working Hours: 9:30 AM – 6:00 PM";
    break;

  case "Limited Services":
    message = "⚠️ Limited Banking Services Available Today. Some services may be delayed.";
    break;

  case "Server Down":
    message = "❌ Bank Server is currently down. Please try again later.";
    break;

  case "Offline":
    message = "🔴 BC Point is currently closed. Please visit during working hours.";
    break;
    case "Holiday":
    message = "🎉 Today is a holiday. Our BC Point is closed today. Services will resume on the next working day.";
    break;
}

    await updateDoc(statusRef, {
    status: newStatus,
    message: message,
    lastUpdated: new Date().toLocaleString("en-IN")
});

    await loadStatus();

    alert("Status updated successfully!");
});
const analyticsRef = doc(db, "analytics", "website");

onSnapshot(analyticsRef, (docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();

        document.getElementById("visitorCount").textContent =
            data.visitors || 0;
    }
});