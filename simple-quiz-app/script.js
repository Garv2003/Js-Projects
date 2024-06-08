const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");

let questions = [
  {
    question: "What does HTML Stands for?",
    imgSrc: "img/html.png",
    choiceA: "Hyper Text Markup Language",
    choiceB: "Hyper Title Markup Language",
    choiceC: "Hyper Tool Markup Language",
    correct: "A",
  },
  {
    question: "What does CSS Stands for?",
    imgSrc: "img/css.png",
    choiceA: "Cascading Style Standards",
    choiceB: "Cascading Style Sheets",
    choiceC: "Cascading Style Stand",
    correct: "B",
  },
  {
    question: "What does JSON Stands for?",
    imgSrc: "img/js.png",
    choiceA: "JavaScript Object Note",
    choiceB: "JavaScript Order Notation",
    choiceC: "JavaScript Object Notation",
    correct: "C",
  },
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;

let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;

let TIMER;

let score = 0;

function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = `<p> ${q.question} </P>`;
  qImg.innerHTML = `<img src="${q.imgSrc}" />`;
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += `<div class="prog" id="${qIndex}"> </div>`;
  }
}

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }

  count = 0;

  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "green";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "red";
}

function scoreRender() {
  scoreDiv.style.display = "block";
  const scorePercent = Math.round(100 * (score / questions.length));
  let scoreImg =
    scorePercent >= 80
      ? "img/5.png"
      : scorePercent >= 60
      ? "img/4.png"
      : scorePercent >= 40
      ? "img/3.png"
      : scorePercent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = `<img src="${scoreImg}" /> `;
  scoreDiv.innerHTML += `<p> ${scorePercent}% </p>`;
}
