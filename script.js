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
        return;
    }
    this.board[i] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
}

// print function
TicTacToe.prototype.print = function () {
    let str = '';
    // loop through the board
    for (let i = 0; i < this.board.length; i++) {
        str += this.board[i] ? this.board[i] : '-';
        if ((i + 1) % 3 === 0) {
            str += '\n';
        }
    }
    console.log(str);
}

// create a new game
const game = new TicTacToe('X', 'O');

// play the game
while (!checkWinner(game.board) && game.board.includes(null)) {
    game.play(Math.floor(Math.random() * 9));
    game.print();
}

// print the winner
console.log(checkWinner(game.board) ? `Winner: ${checkWinner(game.board)}` : 'Draw');