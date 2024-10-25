// script.js
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick() {
    const index = this.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    checkResult();
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Congratulations! Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `Player X's turn`;
    currentPlayer = 'X';
}
