import { db } from "./firebase.js";
import {
    doc,
    onSnapshot,
    getDoc,
    setDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const statusRef = doc(db, "status", "current");
const analyticsRef = doc(db, "analytics", "website");
async function countVisitor() {
    const visitor = localStorage.getItem("visitorCounted");

    if (visitor) return;

    const snap = await getDoc(analyticsRef);

    if (snap.exists()) {
        await updateDoc(analyticsRef, {
            visitors: increment(1)
        });
    } else {
        await setDoc(analyticsRef, {
            visitors: 1
        });
    }

    localStorage.setItem("visitorCounted", "yes");
}

countVisitor();
onSnapshot(statusRef, (docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();
        const statusCard = document.querySelector(".status-card");

        document.getElementById("currentStatus").textContent =
            data.status || "";
            statusCard.classList.remove(
    "status-green",
    "status-yellow",
    "status-red",
    "status-darkred"
);

switch (data.status) {
    case "All Services Available":
        statusCard.classList.add("status-green");
        break;

    case "Limited Services":
        statusCard.classList.add("status-yellow");
        break;

    case "No Server":
        statusCard.classList.add("status-red");
        break;

    case "Server Down":
        statusCard.classList.add("status-darkred");
        break;
        case "Holiday":
    statusCard.classList.add("status-blue");
    break;
}

        document.getElementById("statusMessage").textContent =
            data.message || "";

        document.getElementById("noticeText").textContent =
            data.notice || "";
            const popup = document.getElementById("statusPopup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const closeBtn = document.getElementById("closePopupBtn");

let title = "";
let message = "";

switch (data.status) {
    case "All Services Available":
        title = "✅ All Services Available";
        message = "All banking services are available today.";
        break;

    case "Limited Services":
        title = "⚠️ Limited Services";
        message = "Some banking services may be temporarily unavailable.";
        break;

    case "Server Down":
        title = "🚨 Server Down";
        message = "Bank server is currently unavailable. Please try again later.";
        break;

    case "No Server":
        title = "🔴 No Server";
        message = "Bank server is not available at the moment.";
        break;

    case "Holiday":
        title = "🎉 Holiday";
        message = "Our BC Point is closed today.";
        break;
}

popupTitle.textContent = title;
popupMessage.textContent = message;

popup.classList.remove("hidden");

closeBtn.onclick = function () {
    popup.classList.add("hidden");
};

setTimeout(function () {
    popup.classList.add("hidden");
}, 5000);
            document.getElementById("lastUpdated").textContent =
    "Last Updated: " + (data.lastUpdated || "--");
    }
});