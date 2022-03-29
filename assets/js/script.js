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



var quizTime = 3;


function startTimer() {
    var timer = setInterval(() => {
        timeDisplay.textContent = "Time Left: " + Math.floor(quizTime/60) + ":" + quizTime%60;   
        quizTime--;
            if (quizTime <= 0) {
                timeDisplay.textContent = "TIME's UP!";
                endQuiz();
                quizTime = 0;
                clearInterval(timer);
                
            }

        }, 1000)
}

function loadQuestion(index) {
    var newQuestion = questionList[index];
    questionText.textContent = newQuestion.question;
    shownAnswers.textContent = "";

    // put all possible answers onthe screen.
    // I'll have to make this into a shorter function later. DRY.

    var answer1 = document.createElement('li');
    answer1.textContent = newQuestion.a;
    answer1.setAttribute("data-option", "a")
    answer1.setAttribute("class", "answer")
    shownAnswers.append(answer1);

    var answer2 = document.createElement('li');
    answer2.textContent = newQuestion.b;
    answer2.setAttribute("data-option", "b")
    answer2.setAttribute("class", "answer")
    shownAnswers.append(answer2);

    var answer3 = document.createElement('li');
    answer3.textContent = newQuestion.c;
    answer3.setAttribute("data-option", "c")
    answer3.setAttribute("class", "answer")
    shownAnswers.append(answer3);

    var answer4 = document.createElement('li');
    answer4.textContent = newQuestion.d;
    answer4.setAttribute("data-option", "d")
    answer4.setAttribute("class", "answer")
    shownAnswers.append(answer4);
}





function startQuiz() {
    score = 0;
    currentQuestion = 0;
    quizTime = 10;
    startTimer();
    startButton.style.display = "none";
    loadQuestion(currentQuestion);
    var scoreDisplay = document.createElement('h4');
    scoreDisplay.textContent = "Score: " + score;
    scoreDisplay.setAttribute('id', 'score-display');
    mainBox.appendChild(scoreDisplay);
}


mainBox.addEventListener("click", (e) => {
    if (e.target === startButton) {
        startQuiz();
    } else if (e.target.getAttribute('class') === 'answer') {
        var givenAnswer = e.target.getAttribute('data-option');
        if (givenAnswer === questionList[currentQuestion].answer) {
            score +=10;
            var scoreDisplay = document.getElementById('score-display');
            scoreDisplay.textContent = "Score: " + score;
        } else {
            quizTime -=30;
        }
        currentQuestion++;
        if (currentQuestion >= questionList.length) {
            endQuiz();
        } else {
        loadQuestion(currentQuestion);
        }
    }
});

function endQuiz() {
    console.log("Quiz is over!");
    shownAnswers.textContent = "";
    startButton.textContent = "Play Again"
    startButton.style.display = "block";
    completionTime = quizTime;
    console.log(completionTime);
}

highScoresBtn.addEventListener('click', highScoreToggle);

function highScoreToggle(e) {
    if(!highScoreScreenOn) {
        highScoresBtn.textContent = "Go Back";
    }
    
}