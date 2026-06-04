let gameSeq = [];
let userSeq = [];
let highScore = [];
let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");


document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelUp();
    }
})

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let ranIndx = Math.floor(Math.random() * 4);
    let ranColor = btns[ranIndx];
    gameSeq.push(ranColor);
    console.log(gameSeq);
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameFlash(ranBtn);
    
    let h3 = document.querySelector("#high-score");
    let a = highScore.reduce((max, el) => {
        if (max < el) {
            return el;
        }
        else {
            return max;
        }
    },0)
    h3.innerHTML = `Your highest score is ${a}`;
}

function checkAns(idx) {
    if (gameSeq[idx] == userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game Over! Your score is <b> ${level} <br>Press any key to start`;
        highScore.push(level);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}
