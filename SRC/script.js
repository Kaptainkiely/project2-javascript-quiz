const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#ScoreText');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter =0
let availableQuestions = []

let questions = [
    {
       question: 'which continent is india in ?',
       choice1: 'Europe',
       choice2: 'Asia',
       choice3: 'South America',
       choice4: 'Africa',
       answer: Asia,


    }
]
