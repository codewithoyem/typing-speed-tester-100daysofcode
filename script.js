const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill best improved through practice.",
  "Stay focused and type with accuracy and speed.",
  "JavaScript makes interactive websites fun to build.",
  "Discipline and consistency create great developers.",
];

const sentenceEl = document.getElementById("sentence");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("start-btn");
const resultEl = document.getElementById("result");

let startTime = 0;
let intervalId = null;
let currentSentence = "";

startBtn.addEventListener("click", () => {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = currentSentence;
  inputEl.value = "";
  inputEl.disabled = false;
  resultEl.textContent = "WPM: 0 | Time: 0s | Accuracy: 100%";
  inputEl.focus();
  startTime = new Date().getTime();

  clearInterval(intervalId);
  intervalId = setInterval(updateLiveStats, 500);
});

inputEl.addEventListener("input", () => {
  if (inputEl.value === currentSentence) {
    clearInterval(intervalId);
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    const words = currentSentence.trim().split(/\s+/).length;
    const wpm = Math.round((words / timeTaken) * 60);
    const accuracy = calculateAccuracy(inputEl.value, currentSentence);

    resultEl.textContent = `✅ Completed in ${timeTaken.toFixed(
      2
    )}s — WPM: ${wpm} | Accuracy: ${accuracy}%`;
    inputEl.disabled = true;
  }
});

function updateLiveStats() {
  const now = new Date().getTime();
  const elapsed = (now - startTime) / 1000;

  const typedText = inputEl.value.trim();
  const typedWords = typedText === "" ? 0 : typedText.split(/\s+/).length;
  const liveWPM = Math.round((typedWords / elapsed) * 60);

  const accuracy = calculateAccuracy(inputEl.value, currentSentence);

  resultEl.textContent = `WPM: ${
    isNaN(liveWPM) ? 0 : liveWPM
  } | Time: ${Math.floor(elapsed)}s | Accuracy: ${accuracy}%`;
}

function calculateAccuracy(typed, original) {
  const totalChars = typed.length;
  let correctChars = 0;

  for (let i = 0; i < totalChars; i++) {
    if (typed[i] === original[i]) correctChars++;
  }

  return totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
}
