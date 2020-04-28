// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  var startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  var currentquestion = questions[currentQuestionIndex];
  var titleEL = document.getElementById("question-title");
  titleEL.textContent = currentquestion.title;
  choicesEl.innerHTML = "";
  //choices go here
  currentquestion.choices.forEach(function (choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time = time - 15;
    if (time <= 0) {
      time = 0;
      quizEnd();
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "wrong";
  } else {
    feedbackEl.textContent = "correct";
  }
  //string up the feedback
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  //stop timer
  clearInterval(timerId);
  //show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  //show final screen
  var finalScoreEl = document.createElement("final-score");
  finalScoreEl.textContent = time;
  //hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;
}
function highscore() {
  //saves highscore
  // save initials and score(time left)
}
// user clicks button to start quiz
startBtn.onclick = startQuiz;
