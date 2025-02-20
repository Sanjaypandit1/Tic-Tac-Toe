let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset"); 
let newGame = document.querySelector("#new-game"); 
let winnerText = document.querySelector("#winner"); // Added winner display
let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Add click event listeners to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      box.innerText = turnO ? "O" : "X";
      box.disabled = true;
      turnO = !turnO;

      checkWinner();
    }
  });
});

// Check for winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      winnerText.innerText = `Winner: ${pos1}`; // Show winner on screen
      disableAllBoxes();
      return;
    }
  }

  // Check for draw
  if ([...boxes].every((box) => box.innerText !== "")) {
    winnerText.innerText = "It's a Draw!";
  }
};

// Disable all boxes when someone wins
const disableAllBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

// Reset game when "Reset" button is clicked
reset.addEventListener("click", resetGame);

// Start a new game when "New Game" button is clicked
newGame.addEventListener("click", resetGame);

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  winnerText.innerText = ""; // Clear winner text
  turnO = true;
}
