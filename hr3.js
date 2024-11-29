// script.js

const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X'; // Player X starts
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 board as an array
let isGameActive = true;

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      isGameActive = false;
      gameStatus.textContent = `Player ${currentPlayer} wins!`;
      return;
    }
  }

  // Check if board is full
  if (!gameBoard.includes('')) {
    isGameActive = false;
    gameStatus.textContent = 'It\'s a tie!';
  }
}

// Function to handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] !== '' || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check for winner after each move
  checkWinner();

  // Switch player turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (isGameActive) {
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Function to reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  gameStatus.textContent = `Player X's turn`;
  cells.forEach(cell => cell.textContent = '');
}

// Add event listeners for the cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
