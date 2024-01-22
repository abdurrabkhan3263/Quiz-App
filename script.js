// BACKGROUND IMAGE FOR THE BODY AND GET THE VALUE
let category = 22;
let difficut = 'easy';
let quesNum = 10;

let catObj = {
    Category: 22,
    Geography: 22,
    History: 23,
    Science: 17,
    General: 9,
    Computer: 18,
    VideoGame : 15,
    Arts: 25,
    Animals: 27,
    Sports: 21,
}

const cat = document.querySelector('#cat');
const diff = document.querySelector('#diffi');
const queValue = document.querySelector('#num');
const catOp = document.querySelectorAll('.cat-op')

function giveCat(value) {
    category = catObj[value];
}

cat.addEventListener('change', (event => {
    giveCat(cat.value);
}));

diff.addEventListener('change', (event => {
    difficut = diff.value.toLowerCase();
}));

queValue.addEventListener('change', (event => {
    quesNum = queValue.value;
}));

// START SUBMIT BTN

let startBtn = document.querySelector('#start-btn');
let start = document.querySelector('.start');
let questions = document.querySelector('.questions');
let quesSer = document.querySelector('.question-series')
let scoreSec = document.querySelector('.score-section');
let conBtn = document.querySelector('#con-btn');
let quesBox = document.querySelector('.ques');
let arr;

// QUESTIONS SELECTORS;
const mainQues = document.querySelector('#main-question');
const option = document.querySelectorAll('.match')

async function addingQestions() {
    const url = (`https://opentdb.com/api.php?amount=${quesNum}&category=${category}&difficulty=${difficut}&type=multiple`);
    const response = await fetch(url);
    const result = await response.json();
    console.log(await url)
    arr = await result.results;
}

let optionNum = [[0, 1, 2, 3], [3, 1, 0, 2], [1, 2, 3, 0], [2, 3, 0, 1]];
let correctScrore = 0;
let counter = 0;
let clickeble = true;
let correctSelec;
let scoreValue = 0;
let count = 0

function getAns() {
    option.forEach((value) => {
        value.style.backgroundColor = `rgb(134, 182, 246)`;
        value.addEventListener('click', (event) => {
            if (count === 0) {
                if (event.target.innerHTML == correctSelec.innerHTML) {
                    event.target.style.backgroundColor = `rgb(79, 111, 82)`;
                    scoreValue = scoreValue + 1;
                }
                else if (event.target.innerHTML != correctSelec.innerHTML) {
                    correctSelec.style.backgroundColor = `rgb(79, 111, 82)`;
                    event.target.style.backgroundColor = `red`;
                }
                count = 1;
            }
            else {
                value.removeEventListener('click', arguments.callee);
            }
        })
    })
}

async function loadQues() {
    let randomNumber = Math.floor(Math.random() * 3);
    let data = await arr[counter];
    if (arr.length != 0) {
        let Ques = await data['question'];
        let allOp = [data['incorrect_answers'][0], data['incorrect_answers'][1], data['incorrect_answers'][2], data['correct_answer']];
        let option1 = await allOp[optionNum[randomNumber][0]];
        let option2 = await allOp[optionNum[randomNumber][1]];
        let option3 = await allOp[optionNum[randomNumber][2]];
        let option4 = await allOp[optionNum[randomNumber][3]];
        option[0].innerHTML = await option1;
        option[1].innerHTML = await option2;
        option[2].innerHTML = await option3;
        option[3].innerHTML = await option4;
        option.forEach(value => {
            if (value.innerHTML == data['correct_answer']) {
                correctSelec = value;
            }
        })
        mainQues.innerHTML = `<span>${counter + 1}).</span> ${Ques}`;
        quesSer.innerHTML = `Question ${counter + 1} Out of ${arr.length}`;
        getAns();
    }
}

function loading() {
    quesBox.innerHTML = `
    <h2 id="main-question">LOADING......</h2>
                <div class="ques-option">
                    <ul class="un-list">
                        <h3><li class="match">LOADING....</li></h3>
                        <h3><li class="match">LOADING....</li></h3>
                        <h3><li class="match">LOADING....</li></h3>
                        <h3><li class="match">LOADING....</li></h3>
                    </ul>
                </div>`;
}

startBtn.addEventListener('click', async () => {
    if (start.style.display == 'flex') {
        start.style.display = `none`;
    }
    if (questions.style.display == 'none') {
        questions.style.display = 'block';
    }
    await addingQestions();
    await loadQues();
    counter = counter + 1;
})


// ADDING QUESTION 
let nextQues = document.querySelector('#ans-next');

nextQues.addEventListener('click', async (event) => {
    if (counter >= arr.length) {
        questions.style.display = `none`;
        scoreSec.style.display = 'flex';
        scoreSec.firstElementChild.innerHTML = `Score is ${scoreValue} Out Of ${arr.length}`
        // arr = '';
        correctSelec = '';
        count = 0;
        if (counter != arr.length) {
            await loadQues();
        }
        return;
    } else {
        count = 0;
        await loadQues();
        counter = counter + 1;
    }

})

function restartGame() {
    counter = 0;
    scoreValue = 0;
}

conBtn.addEventListener('click', () => {
    restartGame();
    arr.length = 0;
    loadQues();
    scoreSec.style.display = 'none';
    start.style.display = 'flex';
})