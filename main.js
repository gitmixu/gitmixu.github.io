//kirjautuminen
let loginEmail = document.getElementById('email');
let loginPw = document.getElementById('password');
let loginBtn = document.getElementById('loginBtn');
let logOutBtn = document.querySelector('header button');

loginBtn.addEventListener('click', (event) => {
    if (loginPw.value == "" || loginEmail.value == "") { event.preventDefault(); return;}

    else if (loginEmail.value == "admin@gmail.com" && loginPw.value == "admin"){
        event.preventDefault();

        let userName = document.createTextNode(loginEmail.value.split("@")[0]);
        document.querySelector('header button').appendChild(userName);

        let logOutIcon = document.createElement('i');
        logOutIcon.classList.add("fa-solid", "fa-right-from-bracket");
        document.querySelector('header button').appendChild(logOutIcon);


        document.querySelector('.loginSite').style.display ="none";
        document.querySelector('header').style.display = "flex";
        document.querySelector('.votingSite').style.display = "flex";
        document.querySelector('footer').style.display = "block";
    }

    else if (loginEmail.value != "admin@gmail.com"){
        event.preventDefault();

        let userName = document.createTextNode(loginEmail.value.split("@")[0]);
        document.querySelector('header button').appendChild(userName);

        let logOutIcon = document.createElement('i');
        logOutIcon.classList.add("fa-solid", "fa-right-from-bracket");
        document.querySelector('header button').appendChild(logOutIcon);

        let delBtns = document.querySelectorAll('.del');
        for (let i = 0; i < delBtns.length; i++){delBtns[i].style.display = 'none';}


        document.querySelector('.loginSite').style.display ="none";
        document.querySelector('header').style.display = "flex";
        document.querySelector('.votingSite').style.display = "flex";
        document.querySelector('footer').style.display = "none";
    }
});

logOutBtn.addEventListener('click', () => {
    logOutBtn.innerHTML = "";
    document.querySelector('.loginSite').style.display ="flex";
    document.querySelector('header').style.display = "none";
    document.querySelector('.votingSite').style.display = "none";
    document.querySelector('footer').style.display = "none";
} )

// Äänestyksenteko btn
let toggleStatus = 0;
let toggleStatusIcon = document.querySelector('.newPoll button i');
function toggleMenu() {
    if (toggleStatus == 1) {
        document.querySelector('.data').style.display = 'none';
        toggleStatusIcon.classList.remove('fa-xmark');
        toggleStatusIcon.classList.add('fa-trash-can');
        toggleStatus = 0;
    }
    else if (toggleStatus == 0) {
        document.querySelector('.data').style.display = 'block';
        toggleStatusIcon.classList.remove('fa-trash-can');
        toggleStatusIcon.classList.add('fa-xmark');
        toggleStatus = 1;
    }
}

/* ÄÄNESTÄMINEN */
let example = {
    question:"Best programming language?",
    answers:["C#", "Java", "Python", "JavaScript"],
    pollCount: 20,
    answersWeight: [4, 4, 2, 10],
    selectedAnswer: -1
};

let pollDOMexample = {
    question:document.querySelector(".poll .question"),
    answers:document.querySelector(".poll .answers")
};

pollDOMexample.question.innerText = example.question;
pollDOMexample.answers.innerHTML = example.answers.map(function(answer,i){
    return (
        `
        <div class="answer" onclick="markAnswer('${i}')">
            ${answer}
            <span class="precentage-bar"></span>
            <span class="precentage-value"></span>
        </div>
        `
    );
}).join("");

function markAnswer(i){
    example.selectedAnswer = +i;
    try {
        document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
    } catch(msg){}
    document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
    showResults();
}

function showResults() {
    let answers = document.querySelectorAll(".poll .answers .answer");
    for (let i = 0; i < answers.length; i++) { 
        let precentage = 0;
        if (i == example.selectedAnswer){
            precentage = Math.round(
                (example.answersWeight[i]+1)*100/(example.pollCount+1)
            );
        } else {
            precentage = Math.round(
                (example.answersWeight[i])*100/(example.pollCount+1)
            );
        }
        answers[i].querySelector(".precentage-bar").style.width = precentage + "%";
        answers[i].querySelector(".precentage-value").innerText = precentage + "%";
    }
}

/* ÄÄNESETYKSEN JULKAISU */
let createBtn = document.querySelector('.createBtn');
let pollName = document.getElementById('newPollName');
let pollAnswers = document.querySelectorAll('input#pollAnswer');
let errorText = document.getElementById('newPollError');
let allQuestions = [];

createBtn.addEventListener("click", () => {
    if (pollName.value == "" ) {errorText.innerHTML = "How about Name?"; return; }

    for (let i=0; i<pollAnswers.length; i++) {
        if (pollAnswers[i].value == ""){ errorText.innerHTML = "Please fill in all fields!"; allQuestions = []; return; }
        else if (allQuestions.includes(pollAnswers[i].value) == true){ errorText.innerHTML = "Use different answers"; allQuestions = []; return; }
        allQuestions.push(pollAnswers[i].value);
    }

    // KUN kaikki tiedot on oikein ((itse äänestyksen luonti))
    errorText.innerHTML = ""

    console.log(allQuestions);

    let votingSite = document.querySelector('.votingSite');
    let pollDiv = document.createElement('div');
    let pollDivQues = document.createElement('div');
    let pollDivAnsws = document.createElement('div');
    let pollDel = document.createElement('button');
    let pollDelX = document.createElement('i');

    pollDiv.classList.add('poll');
    pollDivQues.classList.add('question');
    pollDivAnsws.classList.add('answers');
    pollDel.classList.add('del');
    pollDelX.classList.add('fa-solid', 'fa-trash-can');

    votingSite.appendChild(pollDiv);
    pollDiv.appendChild(pollDivQues);
    pollDiv.appendChild(pollDivAnsws);
    pollDiv.appendChild(pollDel);
    pollDel.appendChild(pollDelX);

    // poll tiedot
    let poll = {
        question: pollName.value,
        answers: allQuestions,
        pollCount: 0,
        answersWeight: [25, 25, 25, 25],
        selectedAnswer: -1
    };

    let pollDOM = {
        question:pollDivQues,
        answers:pollDivAnsws
    };

    pollDOM.question.innerText = poll.question;
    pollDOM.answers.innerHTML = poll.answers.map(function(answer,i){
    return ( 
        `
        <div class="answer" onclick="markAnswer('${i}')">
            ${answer}
            <span class="precentage-bar"></span>
            <span class="precentage-value"></span>
        </div>
        ` 
    ); }).join("");

    function markAnswer(i){
        poll.selectedAnswer = +i;
        try {
            document.querySelector(".poll .answers .answer.selected").classList.remove("selected");
        } catch(msg){}
        document.querySelectorAll(".poll .answers .answer")[+i].classList.add("selected");
        showResults();
    }

    function showResults() {
        let answers = document.querySelectorAll(".poll .answers .answer");
        for (let i = 0; i < answers.length; i++) { 
            let precentage = 0;
            if (i == poll.selectedAnswer){
                precentage = Math.round(
                    (poll.answersWeight[i]+1)*100/(poll.pollCount+1)
                );
            } else {
                precentage = Math.round(
                    (poll.answersWeight[i])*100/(poll.pollCount+1)
                );
            }
            answers[i].querySelector(".precentage-bar").style.width = precentage + "%";
            answers[i].querySelector(".precentage-value").innerText = precentage + "%";
        }
    }

    pollName.reset();
    pollAnswers.reset();
});

