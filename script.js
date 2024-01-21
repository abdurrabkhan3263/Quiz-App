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
    Maths: 19,
    Arts: 25,
    Animals: 27,
    Sports: 21,
}

const cat = document.querySelector('#cat');
const diff = document.querySelector('#diffi');
const queValue = document.querySelector('#num');
const catOp = document.querySelectorAll('.cat-op')

function changeBackground(value) {
    category = catObj[value];
    const body = document.body;
    body.style.backgroundImage = `url(img/${value}.jpg)`;
}

cat.addEventListener('change', (event => {
    changeBackground(cat.value);
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

let arr;

// QUESTIONS SELECTORS;
const mainQues = document.querySelector('#main-question');
const option = document.querySelectorAll('.match')

async function addingQestions() {
    const url = (`https://opentdb.com/api.php?amount=${quesNum}&category=${category}&difficulty=${difficut}&type=multiple`);
    const response = await fetch(url);
    const result = await response.json();
    arr = await result.results;
}

let optionNum = [[0, 1, 2, 3], [3, 1, 0, 2], [1, 2, 3, 0], [2, 3, 0, 1]];
let correctScrore = 0;
let counter = 0;
let correctAns = '';
let ClickAns = '';
let clickeble = true;
let value = 0;

option.forEach((value)=>{
    if(clickeble){
        value.addEventListener('click' , event=>{
            console.log(clickeble)
            ClickAns = event.target.innerHTML;
            console.log(ClickAns)
            console.log(correctAns)
            if(ClickAns == correctAns){
                correctScrore = correctScrore + 1;
            }
        })
    }
})

async function loadQues() {
    let randomNumber = Math.floor(Math.random() * 3);
    let data = await arr[counter];
    let Ques = await data['question'];
    let allOp = [data['incorrect_answers'][0], data['incorrect_answers'][1], data['incorrect_answers'][2], data['correct_answer']];
    let option1 = await allOp[optionNum[randomNumber][0]];
    let option2 = await allOp[optionNum[randomNumber][1]];
    let option3 = await allOp[optionNum[randomNumber][2]];
    let option4 = await allOp[optionNum[randomNumber][3]];
    correctAns = option4;
    mainQues.innerHTML = `<span>${counter + 1}).</span> ${Ques}`;
    option[0].innerHTML = option1;
    option[1].innerHTML = option2;
    option[2].innerHTML = option3;
    option[3].innerHTML = option4;
    quesSer.innerHTML = `Question ${counter + 1} Out of ${arr.length}`

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
        clickeble = false;
        return;
    } else {
        await loadQues();
        counter = counter + 1;
    }

})





































// background-color: rgb(79, 111, 82); color: white;
// background-color: rgb(234, 144, 108); color: white;