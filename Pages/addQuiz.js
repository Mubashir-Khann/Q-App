// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_C-Eth1J8-pHqzkT_8FoXIl2Gfcy-gbw",
  authDomain: "quizapp-d49e8.firebaseapp.com",
  databaseURL: "https://quizapp-d49e8-default-rtdb.firebaseio.com",
  projectId: "quizapp-d49e8",
  storageBucket: "quizapp-d49e8.appspot.com",
  messagingSenderId: "286605744142",
  appId: "1:286605744142:web:f35fbb3584b3f9ddc4845f",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

var question = document.getElementById("question");
var optionsInput = document.getElementById("optionsInput");
var Parentoptions = document.getElementById("options-parent");
var correctAnsE = document.getElementById("correctAns");

var options = [];
var correctAns;

window.renderOptions = function () {
  Parentoptions.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    Parentoptions.innerHTML += `<li onclick="correctOption('${options[i]}')">${options[i]}</li>`;
  }
};

window.addOptions = function () {
  if (!optionsInput.value) {
    alert("Please enter value");
    return;
  }
  options.push(optionsInput.value);
  renderOptions();
  optionsInput.value = "";
};
window.correctOption = function (a) {
  correctAns = a;
  correctAnsE.innerHTML = correctAns;
};

window.submitQuestion = function () {
  var obj = {
    question: question.value,
    options: options,
    correctAns: correctAns,
  };
  const newQuestionRef = push(ref(db, "questions/"));
  set(newQuestionRef, obj)
    .then(() => {
      alert("Question is added");
    })
    .catch((error) => {
      alert(error.message);
    });

  question.value = "";
  optionsInput.value = "";
  options = [];
  Parentoptions.innerHTML = "";
  correctAnsE.innerHTML = "Correct Answer";
};
