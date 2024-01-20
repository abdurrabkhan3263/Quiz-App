// BACKGROUND IMAGE FOR THE BODY AND GET THE VALUE
let category = 22;
let difficut = 'easy';
let quesNum = 10;

let catObj = {
    Category : 22,
    Geography : 22,
    History : 23,
    Science : 17,
    General : 9,
    Computer : 18,
    Maths : 19,
    Arts : 25,
    Animals : 27,
    Sports : 21,
}

const cat = document.querySelector('#cat');
const diff = document.querySelector('#diffi');
const queValue = document.querySelector('#num');
const catOp = document.querySelectorAll('.cat-op')

function changeBackground(value){
    category = catObj[value];
    const body = document.body;
    body.style.backgroundImage = `url(img/${value}.jpg)`;
}

cat.addEventListener('change' , (event=>{
    changeBackground(cat.value);
}));

diff.addEventListener('change' , (event=>{
    difficut = diff.value.toLowerCase();
}));

queValue.addEventListener('change' , (event=>{
    quesNum = queValue.value;
}));


let startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click' , ()=>{
    console.log("category   ",category);
    console.log("difficutltltrtf   ",difficut);
    console.log("questionsfnyu    ",quesNum);
})





































// background-color: rgb(79, 111, 82); color: white;
// background-color: rgb(234, 144, 108); color: white;


// const apiCalling = async () =>{
//     const url = (`https://opentdb.com/api.php?amount=11&category=23&difficulty=medium`);
//     const response = await fetch(url);
//     const result = await response.json();
//     apiData(result);
// }

// function apiData(data){
//     console.log(data);
// }

// apiCalling();