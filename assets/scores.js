var highScore = document.querySelector("#highScore")
// clear highschores
var resetBtn = document.querySelector(".reset-button");
var previousPage = document.querySelector(".previous-page")

resetBtn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

previousPage.addEventListener("click", function() {
    window.location.replace("./index.html");
});