const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timeText = document.querySelector('#timer');

//timer function
let timeSecond = 60
timeText.innerHTML= `00:${timeSecond}`
const countDown = setInterval (() => {
    timeSecond--

    timeText.innerHTML = `00:${timeSecond}`
    if(timeSecond===0){
   
    return window.location.assign('./gameover.html')
    }
},1000)

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion() 
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
} else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "True and False is what?",
        answer: [
            { text: 'Number', correct: false },
            { text: 'String', correct: false },
            { text: 'Boleen', correct: true },
            { text: 'HTML', correct: false }
        ]
    },
    {
        question: 'What is a property of an object that contains a function definition?',
        answer: [
            { text: 'Method', correct: true },
            { text: 'Object', correct: false },
            { text: 'Property', correct: false },
            { text: 'Array', correct: false }
        ]
    },
    {
        question: "What is a characteristic of an object, often describing attributes associated with a data structure?",
        answer: [
            {text: 'Object', correct: false },
            {text: 'Method', correct: false },
            {text: 'Array', correct: false },
            {text: 'Property', correct: true }
        ]
    },
    {
        question: "What is an ordered list of values?",
        answer: [
            {text: 'String', correct: false },
            {text: 'Array', correct: true },
            {text: 'Objects', correct: false },
            {text: 'Node.JS', correct: false }
        ]
    },
    {
        question: "Which is a sequence of one or more characters that may consist of letters, numbers, or symbols?",
        answer: [
            {text: 'String', correct: true },
            {text: 'Objects', correct: false },
            {text: 'Number', correct: false },
            {text: 'Array', correct: false }
        ]
    }
]