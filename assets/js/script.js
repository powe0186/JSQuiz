const startButton = document.querySelector("#start-button");
const mainBox = document.querySelector("#main-box");
var timeDisplay = document.querySelector("#time-display")
var questionText = document.querySelector("#question");
var shownAnswers = document.querySelector("ul");
var highScoresBtn = document.querySelector("high-scores-button");
var currentQuestion = 0;
var score = 0;
var completionTime;
var highScores;
var highScoresScreenOn = false;
var quizTime;
init();



function init() {
    retrieveHighScores();
}



function startTimer() {
    var timer = setInterval(() => {
        timeDisplay.textContent = "Time Left: " + Math.floor(quizTime/60) + ":" + quizTime%60;   
        quizTime--;
            if (quizTime <= 0) {
                timeDisplay.textContent = "TIME's UP!";
                endQuiz();
                clearInterval(timer);
                
            }

        }, 1000)
}


function loadAnswer(question, answer) {
    var newAnswer = document.createElement('li');
    newAnswer.textContent = question[answer];
    newAnswer.setAttribute("data-option", answer)
    newAnswer.setAttribute("class", "answer")
    shownAnswers.append(newAnswer);
}

function loadQuestion(index) {
    var newQuestion = questionList[index];
    questionText.textContent = newQuestion.question;
    shownAnswers.textContent = "";
    // put all possible answers onthe screen.

    loadAnswer(newQuestion, 'a');
    loadAnswer(newQuestion, 'b');
    loadAnswer(newQuestion, 'c');
    loadAnswer(newQuestion, 'd');
}





function startQuiz() {
    //initialize quiz score, questions, time.
    score = 0;
    currentQuestion = 0;
    quizTime = 90;
    startTimer();
    startButton.style.display = "none";
    loadQuestion(currentQuestion);
    // if there is not a score box, make one and put it on the screen. Otherwise, update the existing one.
    if (document.getElementById('score-display') === null) {
        var scoreDisplay = document.createElement('h4');
        scoreDisplay.textContent = "Score: " + score;
        scoreDisplay.setAttribute('id', 'score-display');
        mainBox.appendChild(scoreDisplay);
    } else {
        document.getElementById('score-display').textContent = "Score: " + score;
    }
   
}


mainBox.addEventListener("click", (e) => {
    if (e.target === startButton) {
        startQuiz();
    } else if (e.target.getAttribute('class') === 'answer') {
        var givenAnswer = e.target.getAttribute('data-option');
        if (givenAnswer === questionList[currentQuestion].answer) {
            //update score for correct answer.
            score +=10;
            var scoreDisplay = document.getElementById('score-display');
            scoreDisplay.textContent = "Score: " + score;
        } else {
            // lose time for incorrect answer
            quizTime -=30;
        }
        //If that is the last question, end the quiz. Otherwise, load the next question.
        currentQuestion++;
        if (currentQuestion >= questionList.length) {
            endQuiz();
        } else {
        loadQuestion(currentQuestion);
        }
    }
});

function endQuiz() {
    shownAnswers.innerHTML = "";
    checkHighScores(score);
    startButton.textContent = "Play Again"
    startButton.style.display = "block";
    highScoreForm();
    
}

function retrieveHighScores() {
    if (localStorage.highScores !== undefined) {
        highScores = JSON.parse(localStorage.highScores);
    } else {
        highScores = [];
    }
}

function saveHighScores() {
    highScoresString = JSON.stringify(highScores);
    localStorage.setItem("highScores", highScoresString);
}

function checkHighScores(score) {
    if (highScores.length < 5) {

    } else if (score > findScoreToBeat()) {
        highScoreForm();
    }
}

function findScoreToBeat() {
    var scoresArray = [];
    for (let i = 0; i < highScores.length; i++) {
        scoresArray.push(highScores[i].score);
    }
    var scoreToBeat = Math.min(...scoresArray);
    return scoreToBeat;
}

function highScoreForm() {
    question.textContent = "You got a high Score!. Log your initials here:"
    var highScoreForm = document.createElement('form');
    var initialsInput = document.createElement('input');
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('name', 'initials');
    highScoreForm.appendChild(initialsInput);
    var submitBtn = document.createElement('input');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('id', 'submit');
    highScoreForm.appendChild(submitBtn);
    mainBox.appendChild(highScoreForm);
}
