// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyADXsitEqhVydH2ZEG5dYLUR69elUAC6Tw",
  authDomain: "gym-workout-tracker-4f579.firebaseapp.com",
  projectId: "gym-workout-tracker-4f579",
  storageBucket: "gym-workout-tracker-4f579.appspot.com",
  messagingSenderId: "867529121430",
  appId: "1:867529121430:web:06d8bb15fb55c977e7acb7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
