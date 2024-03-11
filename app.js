const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");
const $team1Score = document.getElementById("score-team1");
const $team1Wickets = document.getElementById("wickets-team1");
const $team2Score = document.getElementById("score-team2");
const $team2Wickets = document.getElementById("wickets-team2");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

var team1_Score = 0;
var team1_Wickets = 0;
var team2_Score = 0;
var team2_Wickets = 0;
var team1_Balls = 0;
var team2_Balls= 0;
var turn = 1;

const possibleOutcomes = [0, 1, 2, 3, 4, 6, "W"];

function gameOver() {
  gameOverAudio.play();
  if (team1_Score > team2_Score) alert("IND wins");
  if (team2_Score > team1_Score) alert("PAK wins");
  if (team2_Score === team1_Score) alert("It is another superover!");
}

function updateScore() {
  $team1Score.textContent = team1Score;
  $team1Wickets.textContent = team1Wickets;
  $team2Score.textContent = team2Score;
  $team2Wickets.textContent = team2Wickets;
}

resetButton.onclick = () => {
  window.location.reload();
};

strikeButton.onclick = () => {
  strikeAudio.pause();
  strikeAudio.currentTime = 0;
  strikeAudio.play();
  const randomElement =
    possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];
  if (turn === 2) {
    team2_Balls++;
    document.querySelector(
      `#team2-superover div:nth-child(${team2_Balls})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team2_Wickets++;
    }
    else {
      team2_Score += randomElement;
    }
    if (
      team2_Balls === 6 ||
      team2_Wickets === 2 ||
      team2_Score > team1_Score
    ) {
      turn = 3;
      gameOver();
    }
  }

  if (turn === 1) {
    team1_Balls++;
    document.querySelector(
      `#team1-superover div:nth-child(${team1_Balls})`
    ).textContent = randomElement;
    if (randomElement === "W") {
      team1_Wickets++;
    } else {
      team1_Score += randomElement;
    }
    if (team1_Balls === 6 || team1_Wickets === 2) turn = 2;
  }
  updateScore();
};