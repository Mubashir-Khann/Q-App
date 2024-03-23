import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

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

var questions = [];

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    var reference = ref(db, "questions/");
    onChildAdded(reference, function (data) {
      questions.push(data.val());
      console.log(questions);
      resolve();
    });
  });
}

async function startQuiz() {
  await getDataFromDatabase();
  renderQuestion();
}

var currQ = document.getElementById("currQuestion");
var totalQ = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var renderAns = document.getElementById("answer-parent");

var indexNum = 0;
var score = 0;

window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};

window.currAnswer = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

function renderQuestion() {
  currQ.innerHTML = indexNum + 1;
  totalQ.innerHTML = questions.length;

  if (indexNum < questions.length) {
    question.innerHTML = questions[indexNum].question;

    renderAns.innerHTML = "";
    for (var i = 0; i < questions[indexNum].options.length; i++) {
      renderAns.innerHTML += `<div class="answer">
        <button onclick="currAnswer('${questions[indexNum].options[i]}','${questions[indexNum].correctAns}')">${questions[indexNum].options[i]}</button>
      </div>`;
    }
  } else {
    alert("Quiz is over" + score);
    currQ.innerHTML = "Completed";
  }
}

startQuiz();
