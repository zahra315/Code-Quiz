var username = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById("finalScore");
var mostRecentScore = localStorage.getItem("mostRecentScore");



var scores = JSON.parse(localStorage.getItem("scores")) || [];


finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveScore = event => {
    console.log("clicked the save button!");
    event.preventDefault();

    var score ={
        score: mostRecentScore,
        name: username.value
    };
    scores.push(score);
    localStorage.setItem("scores", JSON.stringify(scores));
    window.location.assign("/");
};