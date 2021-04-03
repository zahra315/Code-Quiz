var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var scoreText = document.getElementById("score");
var timecounter = document.getElementById("timecounter");

var currentQuestion = {};
var acceptingAnswer = false;
var score = 0;
var questionCounter = 0;
var availbleQuestions = [];


var questions = [
    {
        question: "How do you write 'Hello World' in an alert box?",
        choices1: "msg('Hello World')",
        choices2: "msgBox('Hello World');",
        choices3: "alertBox('Hello World');",
        choices4: "alert('Hello World');",
        answer: 3
    },
    {
        question: "How to empty an array in JavaScript?",
        choices: "arrayList[]",
        choices: "arrayList(0)",
        choices: "arrayList.length=0",
        choices: "arrayList.len(0)",
        answer: 2
    },
    {
        question: "What will this output? var a = [1, 2, 3]; console.log(a[6]);",
        choices1: "undefined",
        choices2: "0",
        choices3: "prints nothing",
        choices4: "Syntax error",
        answer: 0
    },
    {
        question: "What function to add an element at the begining of an array and one at the end?",
        choices1: "push,unshift",
        choices2: "unshift,push",
        choices3: "first,push",
        choices4: "unshift,last",
        answer: 1
    },
    {
        question: "How can a value be appended to an array?",
        choices1: "arr(length).value;",
        choices2: "arr[arr.length]=value;",
        choices3: "arr[]=add(value);",
        choices4: "None of these",
        answer: 1
    }
];

//Constants**********
var correct_bonus = 10;
var max_question = 5;

//TimeR**********
var timeLeft = 75;


startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availbleQuestions = [ ...questions];
    console.log(availbleQuestions);
    
    getNewQuestion();
    setTime();
    
};


// Time Set**********
setTime = () => {

    var timerInterval = setInterval(function(){
        timer.innerText = timeLeft;
        timeLeft--;
         if(timeLeft <= 1) {
            timecounter.textContent = "";
            clearInterval(timerInterval);
            return window.location.assign("./saveScore.html");
         }
        
        }, 1000);

}


// Get new question**********
getNewQuestion = () => {
    if (availbleQuestions === 0 || questionCounter >= max_question){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./saveScore.html");
    }
    questionCounter++;
    var questionIndex = Math.floor(Math.random() * availbleQuestions.length);
    currentQuestion = availbleQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choices" + number];
    });

    availbleQuestions.splice(questionIndex, 1);
    acceptingAnswer = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", event => {
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];
        
        var classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        classToApply === "correct" ? trackScore(correct_bonus) : timeLeft -=15
        timer.innerHTML = timeLeft;
        
        selectedChoice.parentElement.classList.add(classToApply);
            
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            alert.innerText=""
        },1000);
    });
});

trackScore = num => {
    score += num;
    scoreText.innerText = score;
};

startQuiz();
