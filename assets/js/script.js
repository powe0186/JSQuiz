const startButton = document.querySelector("#start-button");
const mainBox = document.querySelector("#main-box");
var timeDisplay = document.querySelector("#time-display")
var questionText = document.querySelector("#question");
var shownAnswers = document.querySelector("ul");
var highScoreBtn = document.getElementById("high-score-btn");
var currentQuestion = 0;
var score = 0;
var completionTime;
var highScore = retrieveHighScore();
var highScorer = localStorage.highScorer;
var highScoresScreenOn = false;
var quizTime;
var highScoreBoxIsOn = false;

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
    checkHighScore(score);
    startButton.textContent = "Play Again"
    startButton.style.display = "block";
    
}

function retrieveHighScore() {
    if (localStorage.highScore !== undefined) {
        return 0;
    } else {
        return localStorage.highScore;
    }
}


function checkHighScore(score) {
    console.log("This triggered")
    if (score > highScore || highScore == undefined) {
        var initials = prompt("You have the new high Score! Please enter your name.")
        localStorage.setItem("highScorer", initials);
        localStorage.setItem("highScore", score);
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


function addNewHighScore(e) {
    e.preventDefault();
    var initials = initialsInput.value;
    // Need to figure out how to put the initials and score in the correct place in the high scores array.
}

highScoreBtn.addEventListener("click", function() {
    if (highScoreBoxIsOn) {
        var highScoreBox = document.querySelector('.high-score-box');
        highScoreBox.remove();
        mainBox.style.display = "block";
        highScoreBoxIsOn = false;
        highScoreBtn.innerHTML ="High Score";
    } else {
        mainBox.style.display = "none";
        var highScoreBox = document.createElement('div');
        highScoreBox.setAttribute("class", "high-score-box");
        var highScoreTitle = document.createElement('h3');
        highScoreTitle.textContent = "The Highest score so far: ";
        var highScoreInfo = document.createElement('p');
        highScoreInfo.textContent = highScorer + " ............  " + highScore + " pts";
        highScoreBox.appendChild(highScoreTitle);
        highScoreBox.appendChild(highScoreInfo);
        document.body.appendChild(highScoreBox);
        highScoreBoxIsOn = true;
        highScoreBtn.innerHTML = "Go Back";
    }
    
})
