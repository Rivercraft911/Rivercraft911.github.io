var board,
    game = new Chess();
var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('chessBoard', cfg);

var onMouseoverSquare = function(square, piece) {};
var onMouseoutSquare = function(square, piece) {};
var onSnapEnd = function() {
    board.position(game.fen());
};
var onDrop = function(source, target) {
    // See if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: Always promote to a queen for simplicity
    });

    // Illegal move
    if (move === null) {
        return 'snapback';
    }

    // Make the best move for black
    window.setTimeout(makeBestMove, 250);
};

/* board visualization and games state handling starts here*/

var calculateBestMove = function(game) {
    var newGameMoves = game.ugly_moves();
    var bestMove = null;
    var bestValue = -9999;

    newGameMoves.forEach(function(move) {
        game.ugly_move(move);
        var boardValue = -evalBoard(game.board());
        game.undo();
        if (boardValue > bestValue) {
            bestValue = boardValue;
            bestMove = move;
        }
    });

    return bestMove;
};

var evalBoard = function(board) {
    var totalEvaluation = 0;

    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            totalEvaluation += getPieceValue(board[row][col]);
        }
    }

    return totalEvaluation;
};

var getPieceValue = function(piece) {
    if (piece === null) {
        return 0;
    }

    var pieceValue;

    switch (piece.type) {
        case 'p':
            pieceValue = 10;
            break;
        case 'r':
            pieceValue = 50;
            break;
        case 'n':
            pieceValue = 30;
            break;
        case 'b':
            pieceValue = 30;
            break;
        case 'q':
            pieceValue = 90;
            break;
        case 'k':
            pieceValue = 900;
            break;
        default:
            pieceValue = 0;
            break;
    }

    return piece.color === 'w' ? pieceValue : -pieceValue;
};

/* board visualization and games state handling ends here*/

var onDragStart = function(source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeBestMove = function() {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};

var getBestMove = function(game) {
    if (game.game_over()) {
        alert('Game over');
    }
    var bestMove = null;
    var stockfish = new Worker('https://cdnjs.cloudflare.com/ajax/libs/stockfish/13.0.1/stockfish.asm.js');

    stockfish.onmessage = function(event) {
        if (event.data.startsWith('bestmove')) {
            bestMove = event.data.split(' ')[1];
            game.move({ from: bestMove.slice(0, 2), to: bestMove.slice(2, 4) });
            board.position(game.fen());
            renderMoveHistory(game.history());
        }
    };

    stockfish.postMessage('position fen ' + game.fen());
    stockfish.postMessage('go depth 15');
};

var renderMoveHistory = function(moveHistory) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < moveHistory.length; i += 2) {
        historyElement.append('<span>' + moveHistory[i] + ' ' +
            ( moveHistory[i + 1] ? moveHistory[i + 1] : ' ') + '</span><br>');
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

};

var onDrop = function(source, target)
/* board initialization and configuration starts here */

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};

board = ChessBoard('chessBoard', cfg);

/* board initialization and configuration ends here */

