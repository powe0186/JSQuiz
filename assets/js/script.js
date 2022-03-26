const startButton = document.querySelector("#start-button");
const quizBox = document.querySelector("#main-box");
var timeDisplay = document.querySelector("#time-display")
var questionText = document.querySelector("#question");
var shownAnswers = document.querySelector("ul");
var currentQuestion = 0;
var score = 0;


var quizTime = 3;

var timer = setInterval(() => {
    timeDisplay.textContent = "Time Left: " + Math.floor(quizTime/60) + ":" + quizTime%60;   
    quizTime--;
        if (quizTime < 0) {
            timeDisplay.textContent = "TIME's UP!";
            clearInterval(timer);
        }

    }, 1000)

function loadQuestion(index) {
    questionText.textContent = questionList[index].question;
    addAnswer('option1');
}

function addAnswer(option) {
    var answer = document.createElement('li');
    answer.textContent = questionList[currentQuestion].option;
    shownAnswers.appendChild(answer);
}



function startQuiz() {
    loadQuestion(currentQuestion);
    
    

}


startButton.addEventListener("click", startQuiz);