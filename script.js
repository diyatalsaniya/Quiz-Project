const questions = [{
        question: "Choose the right full form of HTML.",
        answers: [{
                text: "Hyper Taxt Market Language",
                correct: false
            },
            {
                text: "Hyper Tension Language",
                correct: false
            },
            {
                text: "HyperMark Language",
                correct: false
            },
            {
                text: "Hyper Text Markup Language",
                correct: true
            }
        ]
    },
    {
        question: "Choose the right full form of CSS.",
        answers: [{
                text: "Cascading Style Sheets",
                correct: true
            },
            {
                text: "Combine Sheets",
                correct: false
            },
            {
                text: "Copy Style Sheets",
                correct: false
            },
            {
                text: "Create Sheets",
                correct: false
            }
        ]
    },
    {
        question: "How can we change the background color of an element?",
        answers: [{
                text: "backgorund-color",
                correct: true
            },
            {
                text: "color",
                correct: false
            },
            {
                text: "Both A and B",
                correct: false
            },
            {
                text: "None of the above",
                correct: false
            }
        ]
    },
    {
        question: "Javascript is an _______ language?",
        answers: [{
                text: "Object-Oriented",
                correct: true
            },
            {
                text: "Object-based",
                correct: false
            },
            {
                text: "Procedurel",
                correct: false
            },
            {
                text: "Logical",
                correct: false
            }
        ]
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [{
                text: "getElementbyId()",
                correct: false
            },
            {
                text: "getElementByClassName()",
                correct: false
            },
            {
                text: "Both A and B",
                correct: true
            },
            {
                text: "None of the above",
                correct: false
            }
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;
    resetState();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// function selectAnswer(e) {
//     const selectedBtn = e.target;
//     const isCorrect = selectedBtn.dataset.correct === "true";
//     if (isCorrect) {
//         selectedBtn.classList.add("Correct");
//     } else {
//         selectedBtn.classList.add("Incorrect");
//     }
//     Array.from(answerButtons.children).forEach(button => {
//         if (button.dataset.correct === "true") {
//             button.classList.add("Correct");
//             score++;
//         }
//         button.disabled = true;
//     });
//     nextButton.style.display = "block";
// }

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("Correct");
        score++; // Increment score only if the selected answer is correct
    } else {
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("Correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();