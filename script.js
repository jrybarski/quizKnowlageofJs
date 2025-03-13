import { renderTemplate } from "./render.js";

const containerMain = document.querySelector(".container");
const nextBtn = document.getElementById("nextBtn");


let questions = [];
let filteredQuestions = [];
let score = 0;

let { answerA, answerB, answerC, answerD } = renderTemplate(containerMain, filterQuestionsByCategory);

const scoreDisplay = document.createElement("div");
scoreDisplay.id = "scoreDisplay";
scoreDisplay.classList.add("scoreDisplay");
scoreDisplay.innerHTML = `Score: 0`;
containerMain.insertBefore(scoreDisplay, document.getElementById("questionName"));

function updateScoreDisplay() {
    document.getElementById("scoreDisplay").innerHTML = `Score: ${score}`;
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();

        if (questions && questions.length > 0) {
            displayRandomQuestion();
        } else {
            console.error('Brak pytań w pliku JSON.');
        }
    } catch (error) {
        console.error('Błąd podczas ładowania pytań:', error);
    }
}

loadQuestions();

function filterQuestionsByCategory(category) {
    filteredQuestions = questions.filter(q => q.category === category);
    
    if (filteredQuestions.length > 0) {
        displayRandomQuestion();
    } else {
        console.error('Brak pytań dla wybranej kategorii.');
        document.getElementById('questionName').innerHTML = "Brak pytań dla wybranej kategorii.";
        [answerA, answerB, answerC, answerD].forEach(el => {
            el.innerHTML = "";
        });
    }
}

function displayRandomQuestion() {
    const source = filteredQuestions.length > 0 ? filteredQuestions : questions;

    if (source.length > 0) {
        [answerA, answerB, answerC, answerD].forEach(el => {
            el.className = "question"; 
        });

        const randomIndex = Math.floor(Math.random() * source.length);
        const randomQuestion = source[randomIndex];
        const correctAnswer = randomQuestion.correct_answear;

        document.getElementById('questionName').innerHTML = randomQuestion.question_name;
        document.getElementById('questionAnswearA').innerHTML = randomQuestion.answear_a;
        document.getElementById('questionAnswearB').innerHTML = randomQuestion.answear_b;
        document.getElementById('questionAnswearC').innerHTML = randomQuestion.answear_c;
        document.getElementById('questionAnswearD').innerHTML = randomQuestion.answear_d;

        answerA.replaceWith(answerA.cloneNode(true));
        answerB.replaceWith(answerB.cloneNode(true));
        answerC.replaceWith(answerC.cloneNode(true));
        answerD.replaceWith(answerD.cloneNode(true));

        answerA = document.getElementById('questionAnswearA');
        answerB = document.getElementById('questionAnswearB');
        answerC = document.getElementById('questionAnswearC');
        answerD = document.getElementById('questionAnswearD');

        answerA.addEventListener('click', (e) => checkAnswer(e.target, 'a', correctAnswer));
        answerB.addEventListener('click', (e) => checkAnswer(e.target, 'b', correctAnswer));
        answerC.addEventListener('click', (e) => checkAnswer(e.target, 'c', correctAnswer));
        answerD.addEventListener('click', (e) => checkAnswer(e.target, 'd', correctAnswer));
    } else {
        console.error('Brak pytań do wyświetlenia.');
    }
}

// Funkcja sprawdzająca odpowiedź
function checkAnswer(element, selectedAnswer, correctAnswer) {
    if (correctAnswer === selectedAnswer) {
        element.classList.add("correct");
        score++;
        setTimeout(() => {
            updateScoreDisplay(); 
            displayRandomQuestion();
        }, 1000);
    } else {
        element.classList.add("wrong");
        score = 0;
        setTimeout(() => {
            updateScoreDisplay(); 
            displayRandomQuestion();
        }, 1000);
    }
}

// Nasłuchiwacz przycisku "Next"
nextBtn.addEventListener('click', displayRandomQuestion);
