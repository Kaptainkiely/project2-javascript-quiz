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
//The startGame function is used to initialize the game and get it ready to start. It sets the questionCounter to 0, score to 0, and makes a copy of the questions stored in the questions array to the availableQuestions array. 
//The getNewQuestion function is then called to retrieve the first question from the availableQuestions array.
//The purpose of this function is to set the initial values for the game, including the questionCounter, score, and availableQuestions arrays, and to retrieve the first question from the availableQuestions array to start the game.

function handleEnd() {
    localStorage.setItem('mostRecentScore', score )
    console.log(localStorage.getItem("mostRecentScore"))
    return window.location.assign('/end.html')
}
//The handleEnd() function is a JavaScript function that saves the score of the quiz to the local storage of the browser using the localStorage.setItem() method. The score is saved under the key "mostRecentScore".
//Then, it redirects the user to the end.html page using window.location.assign('/end.html'). The window.location object returns the current URL of the page and the assign() method changes the current URL to the specified URL, which in this case is /end.html

function handleQuestionSelection() {
    if(availableQuestions.length === 0) {
        handleEnd();
    }
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    availableQuestions.splice(questionIndex, 1);
}
//First, it checks if there are no more available questions (if(availableQuestions.length === 0)). If that is the case, it calls the handleEnd function.
//If there are still available questions, it generates a random index (questionIndex) using Math.floor(Math.random() * availableQuestions.length).
//Then, it uses the generated index to get the current question from the availableQuestions array.
//Finally, it removes the selected question from the availableQuestions array using the splice method to make sure it doesn't get used again.

function handleAcceptingAnswers() {
    acceptingAnswers = true;
}
//The handleAcceptingAnswers function sets the value of the acceptingAnswers variable to true. 
//This probably indicates that the system is now ready to accept answers to a question and is no longer in a state where it is unable to accept answers. The exact purpose and usage of this function depends on the context in which it is used and the overall code structure.

function handleProgress() {
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
}
//The function handleProgress increments the value of the questionCounter by 1, and updates the text of an element with the ID of progressText with the current progress of the quiz.
// The progress text displays the current question number and the total number of questions in the format "Question {current question number} of {total number of questions}". For example, if the current question is the 5th out of 10 total questions, the progress text would be "Question 5 of 10".


function handleQuestion() {
    question.innerText = currentQuestion.question
    console.log(question)


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
//Sets the text of the question to be displayed on the page by setting the innerText of the question element to the question property of the currentQuestion object.
//Loops through the choices array and sets the innerText of each choice element to the respective choice stored in the currentQuestion object. The choice text is obtained by concatenating the string "choice" with the index number of the choice.
//Adds a click event listener to each choice element. When a choice is clicked, the function checks if the text of the clicked choice is equal to the answer property of the currentQuestion object. If it is, the incrementScore function is called to increase the score by 1.

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
//If there are no available questions left or if the question counter has reached the maximum number of questions, it calls the handleEnd function to end the game.
//It calls the handleQuestionSelection function to randomly select a new question from the availableQuestions array.
//It calls the handleAcceptingAnswers function to set the acceptingAnswers flag to true.
//It calls the handleProgress function to increment the question counter and update the text of the progressText element with the current question number and the total number of questions.
//It calls the handleQuestion function to update the text of the question element with the current question, update the text of the choice elements with the choices for the current question, and add click event listeners to each choice that increment the score if the correct answer is clicked.
//It updates the width of the progressBarFull element to reflect the progress of the quiz game by setting it to the product of the question counter divided by the maximum number of questions multiplied by 100 and concatenated with the "%" symbol.

function incrementScore() {
    score += SCORE_POINTS;
    scoreText.innerText = score;
}
//The "incrementScore" function increases the value of the "score" variable by the value of the constant "SCORE_POINTS". Then it updates the text of the HTML element referred to by "scoreText" to the current value of "score". This function is likely used to keep track of the player's score as they answer questions correctly in a quiz

startGame()



