var questions = [
    {
        prompt: "Function and var are known as",
        options: ["Keywords", "Data Types", "Declaration Statements", "Prototypes"],
        answer: "Declaration Statements"
    },

    {
        prompt: "Which one of the following is the correct way for calling the JavaScript code?",
        options: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
        answer: "Function/Method"
    },

    {
        prompt: "Which function is used to serialize an object into a JSON String in Javascript?",
        options: ["stringify()", "parse()", "convert()", "None of these"],
        answer: "stringify()"
    },

    {
        prompt: "Which HTML element is used to put the JavaScript code?",
        options: ["<javascript>", "<js>", "<scripting>", "<script>"],
        answer: "<script>" 
    },

    {
        prompt: "Which of the following is not a JavaScript Data Types?",
        options: ["Boolean", "String", "Float", "Number"],
        answer: "Float"
    }];

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}


function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}


function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 10;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackEl.style.color = "red";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}


function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

submitBtn.onclick = saveHighscore;

startBtn.onclick = quizStart;