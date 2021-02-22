const question = document.querySelector('#question');
const rightAnswer = document.querySelector('#right-answer');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
	{
		question: 'Quanto é 2 + 2?',
		choice1:  '2',
		choice2:  '3',
		choice3:  '4',
		choice4:  '7',
		answer: 3,
	},	{
		question: 'Quem foi o melhor jogador do mundo em 2020?',
		choice1:  'R. Lewandowski',
		choice2:  'Messi',
		choice3:  'C. Ronaldo',
		choice4:  'Neymar',
		answer: 1,
	},{
		question: 'De qual desenho é o Goku?',
		choice1:  'Naruto',
		choice2:  'Dragon Ball',
		choice3:  'Jackie Chan',
		choice4:  'Yu-Gi-Oh!',
		answer: 2,
	},{
		question: 'Em que ano nasceu Leonardo Da Vinci?',
		choice1:  '1477',
		choice2:  '1328',
		choice3:  '1511',
		choice4:  '1452',
		answer: 4,
	}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
	questionCounter = 0
	score = 0
	availableQuestions = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
		localStorage.setItem('mostRecentScore', score)
		return window.location.assign('end.html')
	}

	questionCounter++ 
	progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
	progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

	const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
	currentQuestion = availableQuestions[questionsIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestions.splice(questionsIndex,1)

	acceptingAnswers = true
}

choices.forEach(choice => {
	choice.addEventListener('click' , e => {
		if(!acceptingAnswers) return
		acceptingAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset['number']
		const rightChoice = currentQuestion.answer

		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

		if (classToApply === 'correct') {
			incrementScore(SCORE_POINTS)
		}
		selectedChoice.parentElement.classList.add(classToApply)
		rightAnswer.innerText = `Resposta correta: alternativa ${rightChoice}!`
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply)
			rightAnswer.innerText = ""
			getNewQuestion()
		}, 3000)
	})
})

incrementScore = num => {
	score += num
	scoreText.innerText = score
}

startGame()