const wordEl = document.querySelector(".word");
const oldWordsEl = document.querySelector(".old-words");

let words = [];
let currentWord = "";
let previousWords = [];

fetch("words.txt")
  .then((response) => response.text())
  .then((text) => {
    words = text.split(",");
    console.log(words);
  });

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
