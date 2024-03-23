// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_C-Eth1J8-pHqzkT_8FoXIl2Gfcy-gbw",
  authDomain: "quizapp-d49e8.firebaseapp.com",
  databaseURL: "https://quizapp-d49e8-default-rtdb.firebaseio.com",
  projectId: "quizapp-d49e8",
  storageBucket: "quizapp-d49e8.appspot.com",
  messagingSenderId: "286605744142",
  appId: "1:286605744142:web:f35fbb3584b3f9ddc4845f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Getting All The Elements With ID
var question = document.getElementById("question");
var optionsInput = document.getElementById("optionsInput");
var Parentoptions = document.getElementById("options-parent");
var correctAnsE = document.getElementById("correctAns");

// This array will be used to push options
var options = [];
// This variable will be used for correct Answer
var correctAns;

// options yaha se add hon ghe Button ke click per
window.renderOptions = function () {
  Parentoptions.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    Parentoptions.innerHTML += `<li onclick="correctOption('${options[i]}')">${options[i]}</li>`;
  }
};

// Agar user option likhe baghir button click kare gha tu ye alert chale gha
window.addOptions = function () {
  if (!optionsInput.value) {
    alert("Please enter value");
    return;
  }
  options.push(optionsInput.value);
  renderOptions();
  optionsInput.value = "";
};
// Correct Options ko click karne per UI per show karae gha
window.correctOption = function (a) {
  correctAns = a;
  correctAnsE.innerHTML = correctAns;
};

// ye Button ke click per chale gha jahah database ma object save hoo gha
window.submitQuestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAns: correctAns,
  };
  // Question a reference add kareen ghe database ma aur Object save kara deen ghe
  // Sweet Alert Chale gha user ko response dene ke liye
  const newQuestionRef = push(ref(db, "questions/"));
  set(newQuestionRef, obj)
    .then(() => {
      alert("Question is added");
    })
    .catch((error) => {
      // agar error aya tu ye alert chale gha
      alert(error.message);
    });

  // Sari values khali hoon jae ghi Database ma add hone ke bad taa ke hum naya question add kar sakeen
  question.value = "";
  optionsInput.value = "";
  options = [];
  Parentoptions.innerHTML = "";
  correctAnsE.innerHTML = "Correct Answer";
};
