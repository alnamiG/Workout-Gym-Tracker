import { db } from './firebase.js';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Elements
const recordsList = document.getElementById('records-list');
const popup = document.getElementById('popup');
const deleteAllBtn = document.getElementById('delete-all-btn');

// Fetch and render records
async function loadRecords() {
  recordsList.innerHTML = "";
  const snapshot = await getDocs(collection(db, "workouts"));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const date = new Date(data.date).toLocaleString();
    const recordDiv = document.createElement("div");
    recordDiv.className = "record-card";
    recordDiv.innerHTML = `
      <strong>${data.split}</strong> <br/>
      <span>${data.exercises.join(", ")}</span><br/>
      <small>${date}</small>
      <button class="delete-btn" data-id="${docSnap.id}">✕</button>
    `;
    recordsList.appendChild(recordDiv);
  });

  attachDeleteListeners();
}

// Delete individual record
function attachDeleteListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "workouts", id));
      showPopup("✅ Record deleted!");
      loadRecords();
    });
  });
}

// Delete all records
deleteAllBtn.addEventListener("click", async () => {
  const snapshot = await getDocs(collection(db, "workouts"));
  const promises = snapshot.docs.map(docSnap =>
    deleteDoc(doc(db, "workouts", docSnap.id))
  );
  await Promise.all(promises);
  showPopup("✅ All records deleted!");
  loadRecords();
});

// Show popup
function showPopup(message) {
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// Initial load
loadRecords();
