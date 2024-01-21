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

let counter = 0;
let arr;

// QUESTIONS SELECTORS;
const mainQues = document.querySelector('#main-question');
const option = document.querySelector('.un-list')

async function addingQestions() {
    const url = (`https://opentdb.com/api.php?amount=${quesNum}&category=${category}&difficulty=${difficut}&type=multiple`);
    const response = await fetch(url);
    const result = await response.json();
    arr = await result.results;
}


async function loadQues(){
    let data = arr[counter];
    let Ques = data['question'];
    let options1 = data['incorrect_answers'][0];
    let options2 = data['incorrect_answers'][1];
    let options3 = data['incorrect_answers'][2];
    let options4 = data['correct_answer'];
    let correctAns = data['correct_answer'];
    console.log(Ques)
    console.log(options1)
    console.log(options2)
    console.log(options3)
    console.log(options4)
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
    counter++;
})


// ADDING QUESTION 
let nextQues = document.querySelector('#ans-next');

nextQues.addEventListener('click', (event) => {
    if(counter >= arr.length){
        return;
    }
    loadQues();
    counter++;
})





































// background-color: rgb(79, 111, 82); color: white;
// background-color: rgb(234, 144, 108); color: white;