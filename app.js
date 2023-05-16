const wordEl = document.querySelector(".word");
const competitiveWordEl = document.querySelector("#competitive-game .word");
const oldWordsEl = document.querySelector(".old-words");
const normalGameButtonEl = document.querySelector("#start-normal-game");
const competitiveGameButtonEl = document.querySelector(
  "#start-competitive-game"
);
const chooseGameEl = document.querySelector("#choose-game");
const normalGameEl = document.querySelector("#normal-game");
const competitiveGameEl = document.querySelector("#competitive-game");
const timeEl = document.querySelector(".time");
const gameEndEl = document.querySelector("#game-end");
const scoredPointsEl = document.querySelector(".scored-points");

const ROUND_TIME = 60; // 60s = 1 minute

let words = [];
let currentWord = "";
let previousWords = [];

let points = 0;

fetch("words.txt")
  .then((response) => response.text())
  .then((text) => {
    words = text.split(",");
    console.log(words);
  });

// Starte ein normales Spiel
function startNormalGame() {
  // Verstecke den Start Screen
  chooseGameEl.classList.add("hidden");
  // Zeige das normale Spiel
  normalGameEl.classList.remove("hidden");
}

// Starte ein Wettkampf Spiel
function startCompetitiveGame() {
  // Verstecke den Start Screen
  chooseGameEl.classList.add("hidden");
  // Zeige das Wettkampf Spiel
  competitiveGameEl.classList.remove("hidden");
  // Generiere das erste Wort
  generateCompetitiveWord();
  // Startzeit anzeigen
  timeEl.innerHTML = ROUND_TIME;
  // Starte den Timer
  let remainingTime = ROUND_TIME;
  // Jede Sekunde updaten
  const intervalId = setInterval(function () {
    // Zeit um eine Sekunde verringern
    remainingTime -= 1;
    // Zeit auf Seite aktualisieren
    timeEl.innerHTML = remainingTime;

    if (remainingTime < 1) {
      // Wenn Zeit abgelaufen ist Interval stoppen
      clearInterval(intervalId);
      // und Spiel Ende anzeigen
      competitiveGameEl.classList.add("hidden");
      gameEndEl.classList.remove("hidden");
      // Richtige Punktzahl anzeigen
      scoredPointsEl.innerHTML = points;
    }
  }, 1000); // Jede Sekunde einmal ausführen
}

function competitiveButtonClick(buttonEl) {
  if (buttonEl.id === "button-correct") {
    points += 1;
  }

  generateCompetitiveWord();
}

function generateCompetitiveWord() {
  // Wir generieren uns ein neues Wort, welches wir bisher noch nicht hatten
  const newWord = getUniqueRandomWord();
  // Danach aktualisieren wir unsere Website, um das neue Wort anzuzeigen
  competitiveWordEl.innerHTML = newWord;
}

function restartCompetitiveGame() {
  // Punktestand resetten
  points = 0;
  // Endscreen verstecken
  gameEndEl.classList.add("hidden");
  // Spiel starten
  startCompetitiveGame();
}

// Das hier passiert, wenn wir auf den button klicken
function onClick() {
  if (currentWord) {
    // Wenn wir gerade noch ein Wort anzeigen, so fügen wir dieses den vorherigen Wörtern hinzu
    previousWords.unshift(currentWord);
    // Danach aktualisieren wir noch unsere Website, um den neuen Wert anzuzeigen
    oldWordsEl.innerHTML = previousWords.join(", ");
  }

  // Wir generieren uns ein neues Wort, welches wir bisher noch nicht hatten
  const newWord = getUniqueRandomWord();
  // Wir setzen dieses Wort als unser neues aktuelles Wort
  currentWord = newWord;
  // Danach aktualisieren wir unsere Website, um das neue Wort anzuzeigen
  wordEl.innerHTML = currentWord;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomWord() {
  return words[getRandomInt(words.length)];
}

function getUniqueRandomWord() {
  let newWord = getRandomWord();

  while (previousWords.includes(newWord)) {
    newWord = getRandomWord();
  }

  return newWord;
}
