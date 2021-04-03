var clearBtn = document.querySelector("#clearScores");
var scoresList = document.getElementById("scoresList");
var scoresEl = JSON.parse(localStorage.getItem("scores"));


//List all scores**********
scoresList.innerHTML =
scoresEl.map(score => {
    return `<li class="scoresList">${score.name} scored ${score.score}</li>`;
}).join("");


// Clear local storage**********
clearBtn.addEventListener("click", function () {
    scoresList.innerHTML = "";
    window.localStorage.clear();

});

