var questionIndex = 0;
var score = 0;
var timer = document.querySelector(".timer");
var startScreen = document.querySelector(".start-screen");
var wrapper = document.querySelector(".wrapper");
var startBtn = document.querySelector("#start");
var holdTimer = 0;
var secondsRemaining = 80;
var timePenalty = 10;
var ulCreate = document.createElement("ol");

startBtn.addEventListener("click", function () {
    if (holdTimer === 0) {
        holdTimer = setInterval(function () {
            secondsRemaining--;
            timer.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(holdTimer);
                allDone();
                timer.textContent = "Time's Up";
            }
        }, 1000);
    }
    render(questionIndex)
});

function render(questionIndex) {
    startScreen.innerHTML = "";
    ulCreate.innerHTML = "";
    for (let i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        startScreen.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        startScreen.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));  
    });
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionIndex].answer;
        } else {
            secondsRemaining = secondsRemaining - timePenalty;
            createDiv.textContent = "Wrong! the correct answer is: " + questions[questionIndex].answer;
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of Quiz!" + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    startScreen.appendChild(createDiv);
}

function allDone() {
    startScreen.innerHTML = "";
    timer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"
    
    startScreen.appendChild(createH1);

    var createH2 = document.createElement("h2");
    createH2.setAttribute("id", "createH2");

    startScreen.appendChild(createH2);

    if (secondsRemaining >= 0) {
        var timeRemaining = secondsRemaining;
        var createH3 = document.createElement("h3");
        clearInterval(holdTimer);
        createH2.textContent = "Your final score is: " + timeRemaining;
        
        startScreen.appendChild(createH3);
    }
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    startScreen.appendChild(createLabel);

    var createInput = document.createElement("input")
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    startScreen.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    startScreen.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === null) {
            alert("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores)
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("./highscores.html")
        }
    })
}   