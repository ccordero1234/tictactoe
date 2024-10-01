// TicTacToe 
function TicTacToe(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = player1;
    this.board = new Array(9).fill(null);
}

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    // loop through the winning combos
    for (let combo of winningCombos) {
        // seperate the moves
        const [a, b, c] = combo;
        // check if there is a winner
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// play function
TicTacToe.prototype.play = function (i) {
    if (this.board[i] || checkWinner(this.board)) {
        return false;
    } else {
        this.board[i] = this.currentPlayer;
        return true;
    }
}

// switch player function
TicTacToe.prototype.switchPlayer = function () {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
}

// UI functionality 
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const start  = document.querySelector('.start');
let game;

// start game
start.addEventListener('click', function(e) {
    start.textContent = 'Start';
    const player1 = document.querySelector('.player-one').value;
    const player2 = document.querySelector('.player-two').value;
    if (player1 === "" && player2 === "") {
        message.textContent = 'Please enter players names';
    } else {
        // create a new game
        game = new TicTacToe(player1, player2);
        message.textContent = `${game.currentPlayer}'s turn`;

        // Clear the board UI
        cells.forEach(cell => {
            cell.textContent = "";
            cell.addEventListener('click', handleMove, { once: true }); // Listen for moves
        });
    }
})

// Function to handle a move
function handleMove(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    // Make a move in the game
    if (game.play(index)) {
        cell.textContent = game.currentPlayer === game.player1 ? 'X' : 'O';

        // Check for winner
        if (checkWinner(game.board)) {
            message.textContent = `${game.currentPlayer} wins!`;
            disableBoard();
            start.textContent = 'Play Again';
        } else if (!game.board.includes(null)) {
            message.textContent = "It's a tie!";
            start.textContent = 'Play Again';
        } else {
            // Switch players
            game.switchPlayer();
            message.textContent = `${game.currentPlayer}'s turn`;
        }
    }
}

// Disable further moves after the game ends
function disableBoard() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleMove);
    });
}
