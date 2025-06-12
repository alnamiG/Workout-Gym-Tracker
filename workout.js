import { db } from './firebase.js';
import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const exerciseData = {
  Back: ["Deadlifts", "Pull-Ups", "Bent Over Rows"],
  Chest: ["Bench Press", "Push-Ups", "Cable Fly"],
  Legs: ["Squats", "Lunges", "Leg Press"],
  Shoulders: ["Overhead Press", "Lateral Raise", "Shrugs"],
  Biceps: ["Barbell Curls", "Hammer Curls", "Cable Curls"],
  Triceps: ["Dips", "Skull Crushers", "Pushdowns"]
};

const splitMenu = document.getElementById('split-menu');
const exerciseList = document.getElementById('exercise-list');
const form = document.getElementById('workout-form');
const popup = document.getElementById('popup');

let selectedSplit = "";
let selectedExercises = [];

const splitBtn = document.getElementById('split-button');

splitMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    selectedSplit = e.target.dataset.split;
    splitBtn.textContent = selectedSplit + " ⬇"; // Update button label
    showExercises(selectedSplit);
  }
});


function showExercises(split) {
  const exercises = exerciseData[split];
  selectedExercises = [];
  exerciseList.innerHTML = exercises.map(ex =>
    `<button type="button" class="exercise-btn">${ex}</button>`
  ).join('');

  document.querySelectorAll('.exercise-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const text = btn.textContent;
      if (btn.classList.contains('selected')) {
        selectedExercises.push(text);
      } else {
        selectedExercises = selectedExercises.filter(ex => ex !== text);
      }
    });
  });
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!selectedSplit || selectedExercises.length === 0) {
    alert("Please select a split and at least one workout.");
    return;
  }

  await addDoc(collection(db, "workouts"), {
    split: selectedSplit,
    exercises: selectedExercises,
    date: new Date().toISOString()
  });

  //  Show popup
  console.log("Workout saved!");
  popup.classList.add('show');

  //  Auto hide after 2 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);

  // Reset
  form.reset();
  exerciseList.innerHTML = "";
  selectedSplit = "";
  selectedExercises = [];
});


