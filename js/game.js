const grid = document.querySelector('.grid')
const size = 8;
let squares = [];   //index that contains all emojis
let div_score = document.getElementById('score');
let bestScore = JSON.parse(localStorage.getItem("bestScore"));
let score;
//timer
let timer;
let timeLeft = 90;
//variables used when making elements draggable
let emojiDragged;
let emojiReplaced;
let idDragged;
let idReplaced;
const srces = ['url(../img/1.gif)', 'url(../img/2.gif)', 'url(../img/3.gif)', 'url(../img/4.gif)', 'url(../img/5.gif)'];
let level = 1;



function createBoard() {
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement('div');
        square.setAttribute('draggable', true);
        square.setAttribute('id', i);
        let randomColor = Math.floor(Math.random() * srces.length);
        square.style.backgroundImage = srces[randomColor];
        square.style.backgroundSize = "contain";
        grid.appendChild(square);
        squares.push(square);
    }
    score = 0;
}

//============================================================================
//  create draggable elements
//===========================================================================
function drag_start_f() {
    emojiDragged = this.style.backgroundImage;
    idDragged = parseInt(this.id);
}

function drag_Over_f(e) {

    e.preventDefault();
}

function drag_Enter_f(e) {

    e.preventDefault();
}

function drag_Leave_f() {
    this.style.backgroundImage = '';
}

function drag_Drop_f() {
    score -= 5;
    div_score.innerHTML = score;
    emojiReplaced = this.style.backgroundImage;
    idReplaced = parseInt(this.id);
    this.style.backgroundImage = emojiDragged;
    squares[idDragged].style.backgroundImage = emojiReplaced;
}

function drag_end_f() {
    //What is a valid move?
    let validMoves = [idDragged - 1, idDragged - size, idDragged + 1, idDragged + size];
    let validMove = validMoves.includes(idReplaced);
    if (validMove) {
        idReplaced = null;
    } else if (idReplaced && !validMove) {
        squares[idReplaced].style.backgroundImage = emojiReplaced;
        squares[idDragged].style.backgroundImage = emojiDragged;
    } else {
        squares[idDragged].style.backgroundImage = emojiDragged;
    }
}

//calls all the functions that create draggable elements
function dragged(){
    squares.forEach(square => square.addEventListener('dragstart', drag_start_f));
    squares.forEach(square => square.addEventListener('dragend', drag_end_f));
    squares.forEach(square => square.addEventListener('dragover', drag_Over_f));
    squares.forEach(square => square.addEventListener('dragenter', drag_Enter_f));
    squares.forEach(square => square.addEventListener('drageleave', drag_Leave_f));
    squares.forEach(square => square.addEventListener('drop', drag_Drop_f));
}

function fill_empty_spaces() {
    for (let i = 0; i < size * size - size; i++) {
        if (squares[i + size].style.backgroundImage === '') {
            squares[i + size].style.backgroundImage = squares[i].style.backgroundImage;
            squares[i].style.backgroundImage = '';
        }
        if (i < size && (squares[i].style.backgroundImage === '')) {
            let randomColor = Math.floor(Math.random() * srces.length);
            squares[i].style.backgroundImage = srces[randomColor];
        }
    }
}

function check_row_four() {
    for (let i = 0; i < size * size - 3; i++) {
        let indices = [i, i + 1, i + 2, i + 3];
        let blank = squares[i].style.backgroundImage === '';
        let emoji = squares[i].style.backgroundImage;
        const not_valid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 61, 62, 63]
        if (not_valid.includes(i)) {
            continue;
        }
        if (indices.every(index => squares[index].style.backgroundImage === emoji && !blank)) {
            score += 20;
            div_score.innerHTML = score;
            indices.forEach(item => { squares[item].style.backgroundImage = '' });
        }
    }

}

function check_row_three() {
    for (let i = 0; i < size * size - 2; i++) {
        let indices = [i, i + 1, i + 2];
        let blank = squares[i].style.backgroundImage === '';
        let emoji = squares[i].style.backgroundImage;
        const not_valid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63]
        if (not_valid.includes(i)) {
            continue;
        }
        if (indices.every(index => squares[index].style.backgroundImage === emoji && !blank)) {
            score += 15;
            div_score.innerHTML = score;
            indices.forEach(item => { squares[item].style.backgroundImage = '' });
        }
    }
}

function check_column_4() {
    for (let i = 0; i < size * size - 2; i++) {
        let indices = [i, i + size, i + 2 * size, i + 3 * size];
        let blank = squares[i].style.backgroundImage === '';
        let emoji = squares[i].style.backgroundImage;
        const not_valid = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
        if (not_valid.includes(i)) {
            continue;
        }
        if (indices.every(index => squares[index].style.backgroundImage === emoji && !blank)) {
            score += 20;
            if (level == 2)
                score += 15;
            div_score.innerHTML = score;
            indices.forEach(item => { squares[item].style.backgroundImage = '' });
        }

    }
}

function check_column_3() {
    for (let i = 0; i < size * size - 2; i++) {
        let indices = [i, i + size, i + 2 * size];
        let blank = squares[i].style.backgroundImage === '';
        let emoji = squares[i].style.backgroundImage;
        const not_valid = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63]
        if (not_valid.includes(i)) {
            continue;
        }
        if (indices.every(index => squares[index].style.backgroundImage === emoji && !blank)) {
            score += 15;
            div_score.innerHTML = score;
            indices.forEach(item => { squares[item].style.backgroundImage = '' });
        }
    }
}

function hint() {
    score -= 40;
    div_score.innerHTML = score;
    for (let i = 2; i < 55; i++) {
        let set_options = [i - 2, i - 1 - size, i - 1 + size, i + 3, i + 2 + size, i + 2 - size];

        if (squares[i].style.backgroundImage === squares[i + 1].style.backgroundImage) {
            const not_valid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 22, 23, 24, 25, 30, 31, 32, 33, 38, 39, 40, 41, 46, 47, 48, 49, 54, 55, 56, 57]
            if (not_valid.includes(i)) {
                continue;
            }
            if (set_options.find(index => squares[index].style.backgroundImage === squares[i].style.backgroundImage)) {
                let squareHint = squares[i];
                squareHint.classList.add('hint');
                let squareHint2 = squares[i + 1];
                squareHint2.classList.add('hint');
                break;
            }
        }
    }
}

function callHint() {
    let hint_button = document.getElementById("hint");
    hint_button.addEventListener("click", hint);
}

//===============================================================================================================
// when the time is up and message with 'you won' or 'you lost' pops up there is an option 
// of clicking 'home' which sends you back to the original web page.
//  *if you win there is a button that sends you to the next level and then the screen is blocked with a page
//   that has the instructions to the second level.
//  *if you loose there is a button that restarts the game.
//================================================================================================================

//clears the instructions 
function instructionsLevelTwo(){
    let instruct = document.getElementById('instruction2');
    instruct.style.display = 'none';
}

function nextLevelClick() {
    document.getElementById('hint').style.display = 'none';
    document.getElementById('time_up').style.display = 'none';
    level = 2;
    timeLeft = 90;
    score = 0;
    div_score.innerHTML = score;
    document.getElementById('instruction2').style.display = "block";
    let instruct = document.getElementById('instruction2');
    instruct.addEventListener("click",instructionsLevelTwo);
    beginGame();
}

//function that restarts the game after clicking 'try again'
function tryAgain() {
    location.href = "game.html";
}

//function that sends to web after clicking 'home'
function website() {
    location.href = "website.html";
}

//this function adds the users name when the message 'you won'/'you lost' shows:
function addName() {
    let namepopup = document.getElementById("popUpName");
    let person1 = JSON.parse(window.localStorage.getItem('person'));
    console.log(person1)
    namepopup.innerHTML = person1.name;
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        let youSetHighScore = document.getElementById('high_score');
        youSetHighScore.style.display = 'block';
    }
}

function youWon() {
    let popup = document.getElementById("time_up");
    document.getElementById('home').addEventListener("click", website);
    document.getElementById('you_win').innerHTML = 'congratulations you won!';
    let btn = document.createElement('button');
    btn.classList.add('level_2');
    you_win.appendChild(btn);
    btn.innerHTML = "level 2";
    document.getElementById('final_score').innerHTML = score;
    btn.addEventListener("click", nextLevelClick);
    addName();
    popup.style.display = 'block';
}

function youLost() {
    let popup = document.getElementById("time_up");
    addName();
    document.getElementById('home').addEventListener("click", website);
    document.getElementById('you_win').innerHTML = 'you lost!';
    let btn = document.createElement('button');
    btn.classList.add('retry');
    you_win.appendChild(btn);
    btn.innerHTML = "try again";
    document.getElementById('final_score').innerHTML = score;
    popup.style.display = 'block';
    btn.addEventListener("click", tryAgain);
    let symbol = document.getElementById('time_up');
    symbol.createElement()
}

//pops up when the time is up and shows if the user won or lost
function time_up() { 
    if (score >= 100) {
        youWon();
    }
    else {
        youLost();
    }
}


//============================================================================================================
//   Timer
//=============================================================================================================
function gameOver() {
    clearInterval(timer);
    time_up();
}

function updateTimer() {
    timeLeft = timeLeft - 1;
    if (timeLeft >= 0)
        document.getElementById('timer').innerHTML = timeLeft;
    else {
        gameOver();
    }
}

function start() {
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

function signOut(){
    localStorage.removeItem("person");
    location.href="website.html";
}

function main() {
    start();
    createBoard();
    score.innerHTML = 0;
    dragged();
    let sign_out=document.getElementById("sign_out");
    sign_out.addEventListener("click", signOut);
    window.setInterval(function () {
        check_row_four();
        if (level == 1)
            check_row_three();
        check_column_4();
        if (level == 1)
            check_column_3();
        fill_empty_spaces();
        if (level == 1)
            callHint();
    }, 150);
}

function beginGame() {
    if (!localStorage.getItem("bestScore")) {
        localStorage.setItem('bestScore', 0);
    }
    let highScorediv;
    highScorediv = document.getElementById("scorebest");
    highScorediv.innerHTML = bestScore;
    main();
}

beginGame();