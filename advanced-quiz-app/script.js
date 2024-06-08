//selcting elements
const homePage = document.getElementById("home");
const quizPage = document.getElementById("quiz");
const highScorePage = document.getElementById("highScorePage");
const endPage = document.getElementById("endPage");

const homePlayBtn = document.getElementById("homePlayBtn");
const navHighScoreBtn = document.getElementById("navHighScoreBtn");
const navPlayBtn = document.getElementById("navPlayBtn");

const numberOfQuestion = document.getElementById("numberOfQuestion");
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstText = document.getElementById("progresstText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

const tBody = document.getElementById("tBody");
const highScorePageHomeBtn = document.getElementById("highScorePageHomeBtn");

let qAmount = 0;
let qCategory = "";
let qDifficulty = "";
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let MAX_QUESTIONS;

const CORRECT_BONUS = 10;

navPlayBtn.addEventListener("click", quizPlay);
homePlayBtn.addEventListener("click", quizPlay);

function quizPlay(e) {
  e.preventDefault();
  if (numberOfQuestion.value && numberOfQuestion.value > 0) {
    qAmount = numberOfQuestion.value > 50 ? 50 : numberOfQuestion.value;
    qCategory =
      category.value === "generalKnowledge"
        ? 9
        : category.value === "sports"
        ? 21
        : category.value === "computers"
        ? 18
        : category.value === "history"
        ? 23
        : category.value === "film"
        ? 11
        : category.value === "comics"
        ? 29
        : category.value === "art"
        ? 25
        : category.value === "politics"
        ? 25
        : category.value === "geography"
        ? 22
        : category.value === "sciAndNatures"
        ? 17
        : category.value === "mathematics"
        ? 19
        : "";
    qDifficulty = difficulty.value;

    homePage.classList.add("hidden");
    loader.classList.remove("hidden");
    fetchQuestions();
  } else {
    console.log("there is no question amount");
    alert("Enter the amount of questions");
  }
}

let allQuestions = [];
function fetchQuestions() {
  const url = `https://opentdb.com/api.php?amount=${qAmount}&category=${qCategory}&difficulty=${qDifficulty}&type=multiple`;

  fetch(url)
    .then((res) => res.json())
    .then((questions) => loadQuestions(questions.results));
}

function loadQuestions(loadedQuestions) {
  allQuestions = loadedQuestions.map((loadedQuestion) => {
    const formattedQuestion = {
      question: loadedQuestion.question,
    };

    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;

    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedQuestion.correct_answer
    );

    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });
    return formattedQuestion;
  });

  startQuiz();
}

const startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...allQuestions];
  MAX_QUESTIONS = allQuestions.length;
  getNewQuestion();
  quizPage.classList.remove("hidden");
  loader.classList.add("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    endPageFunc();
    quizPage.classList.add("hidden");
    endPage.classList.remove("hidden");
  } else {
    questionCounter++;
    progresstText.innerText = `Question ${questionCounter}/${
      MAX_QUESTIONS || allQuestions.length
    }`;

    progressBarFull.style.width = `${
      100 * (questionCounter / allQuestions.length)
    }%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];
    question.innerText = `Q. ${currentQuestion.question}`;
    choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerHTML = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    window.onbeforeunload = function () {
      return "Dude, are you sure you want to leave? Think of the kittens!";
    };
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", function (e) {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const rightOrWrongClass =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    rightOrWrongClass == "correct" ? increementScore(CORRECT_BONUS) : "";

    selectedChoice.parentElement.classList.add(rightOrWrongClass);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(rightOrWrongClass);
      getNewQuestion();
    }, 1000);
  });
});

const increementScore = (bonus) => {
  score += bonus;
  scoreText.innerText = score;
};

function endPageFunc() {
  const mostRecentScore = localStorage.getItem("mostRecentScore");
  finalScore.innerText = mostRecentScore;
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const MAX_HIGH_SCORES = 5;

  username.addEventListener("keyup", function () {
    saveScoreBtn.disabled = !username.value;
  });

  saveScoreBtn.addEventListener("click", function (e) {
    e.preventDefault();

    score = 0;
    const scores = {
      score: mostRecentScore,
      name: username.value,
    };

    highScores.push(scores);

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    endPage.classList.add("hidden");
    homePage.classList.remove("hidden");
    scoreText.innerHTML = "0";
  });
}

navHighScoreBtn.addEventListener("click", function () {
  homePage.classList.add("hidden");
  highScorePage.classList.remove("hidden");

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  tBody.innerHTML = "";

  highScores.map((highScore, index) => {
    tBody.innerHTML += `
            <tr>    
                <td> ${index + 1} </td>
                <td> ${highScore.name} </td>
                <td> ${highScore.score}  </td>
            </tr>
        `;
  });
});

highScorePageHomeBtn.addEventListener("click", function () {
  homePage.classList.remove("hidden");
  highScorePage.classList.add("hidden");
});
