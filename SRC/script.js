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
       question: 'which continent is India in ?',
       choice1: 'Europe',
       choice2: 'Asia',
       choice3: 'South America',
       choice4: 'Africa',
       answer: 'Asia',
    },

    {
        question: 'how many sides does a pentagon have ?',
        choice1: '5',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        answer: '5',
    },

     {
        question: 'what is 7+2+5= ',
        choice1: '12',
        choice2: '18',
        choice3: '14',
        choice4: '16',
        answer: '14',
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

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions=[...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
        localStorage.setItem('mostRecentScore', score )
        return window.location.assign('/end.html')
    }

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    
        questionCounter++;
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`

        question.innerText = currentQuestion.question

        choices.forEach(choice => {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion ['choice' + number]
        });

        incrementScore = num => {
            score += num;
            scoreText.innerText = score;
        }


        choices.forEach(choice => {
            choice.addEventListener('click', e => {
                if(!acceptingAnswers) return;
                acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset['number'];
                let classToApply = 'incorrect';
                let message = 'Incorrect';
                if(selectedAnswer === currentQuestion.answer) {
                    classToApply = 'correct'
                    message = 'Correct';
                    incrementScore(SCORE_POINTS)
                }
                
                selectedChoice.parentElement.classList.add(classToApply);
                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply);
                    getNewQuestion();
                }, 1000);
            });
        });
    }

