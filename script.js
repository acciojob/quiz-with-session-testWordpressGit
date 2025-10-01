// Questions and answers
const quizData = [
  {
    question: "1. Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "2. What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    correct: 1
  },
  {
    question: "3. What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
    correct: 0
  },
  {
    question: "4. What year was JavaScript launched?",
    options: ["1996", "1995", "1994", "None of the above"],
    correct: 1
  },
  {
    question: "5. Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<scripting>"],
    correct: 1
  }
];

// DOM elements
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load stored score if available
if (localStorage.getItem("score")) {
  scoreDisplay.textContent = `Your score is ${localStorage.getItem("score")} out of 5.`;
}

// Load saved progress
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render quiz
quizData.forEach((q, i) => {
  const qDiv = document.createElement("div");
  qDiv.innerHTML = `<p>${q.question}</p>`;
  
  q.options.forEach((option, j) => {
    const optionId = `q${i}_opt${j}`;
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question${i}`;
    radio.value = j;
    radio.id = optionId;

    // Restore saved progress
    if (savedProgress[i] == j) {
      radio.checked = true;
    }

    radio.addEventListener("change", () => {
      savedProgress[i] = j;
      sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    });

    const label = document.createElement("label");
    label.setAttribute("for", optionId);
    label.textContent = option;

    qDiv.appendChild(radio);
    qDiv.appendChild(label);
    qDiv.appendChild(document.createElement("br"));
  });

  questionsContainer.appendChild(qDiv);
});

// Submit button
submitBtn.addEventListener("click", () => {
  let score = 0;
  quizData.forEach((q, i) => {
    if (savedProgress[i] == q.correct) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);

  // Optional: clear session storage after submission
  sessionStorage.removeItem("progress");
});
