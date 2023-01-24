const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#Score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter =0
let availableQuestions = []

let questions = [
    {
       question: 'which continent is India in ?',
       choice1: 'Europe',
       choice2: 'Asia',
       choice3: 'South America',
       choice4: 'Africa',
       answer: 'Asia',
    },

    {
        question: 'how many sides does a pentagon have ?',
        choice1: 'five',
        choice2: 'six',
        choice3: 'seven',
        choice4: 'eight',
        answer: 'five',
    },

     {
        question: 'what is Aarons middle name',
        choice1: 'fred',
        choice2: 'frank',
        choice3: 'frazer',
        choice4: 'francis',
        answer: 'frazer',
     },

     {
        question: 'what fruit are minions obsessed with ?',
        choice1: 'Apples',
        choice2: 'melons',
        choice3: 'strawberries',
        choice4: 'bananas',
        answer: 'bananas',
     }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

function startGame() {
    console.log("Start game function called")
    questionCounter = 0
    score = 0
    availableQuestions=[...questions]
    getNewQuestion()
}

function handleEnd() {
    localStorage.setItem('mostRecentScore', score )
    console.log(localStorage.getItem("mostRecentScore"))
    return window.location.assign('/end.html')
}

function handleQuestionSelection() {
    if(availableQuestions.length === 0) {
        handleEnd();
    }
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    availableQuestions.splice(questionIndex, 1);
}

function handleAcceptingAnswers() {
    acceptingAnswers = true;
}

function handleProgress() {
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
}

function handleQuestion() {
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion ['choice' + number];
    });
    
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(e.target.innerText === currentQuestion.answer) {
                incrementScore();
            }
        });
    });
    
}

function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
        handleEnd();
    }

    handleQuestionSelection();
    handleAcceptingAnswers();
    handleProgress();
    handleQuestion();
    progressBarFull.style.width = (questionCounter/MAX_QUESTIONS)* 100 + "%";
}

function incrementScore() {
    score += SCORE_POINTS;
    scoreText.innerText = score;
}

startGame()



