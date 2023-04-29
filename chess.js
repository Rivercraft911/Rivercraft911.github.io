var board,
  game = new Chess();

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
    case "p":
      pieceValue = 10;
      break;
    case "r":
      pieceValue = 50;
      break;
    case "n":
      pieceValue = 30;
      break;
    case "b":
      pieceValue = 30;
      break;
    case "q":
      pieceValue = 90;
      break;
    case "k":
      pieceValue = 900;
      break;
    default:
      pieceValue = 0;
      break;
  }

  return piece.color === "w" ? pieceValue : -pieceValue;
};

var onDragStart = function(source, piece, position, orientation) {
  if (game.in_checkmate() === true || game.in_draw() === true || piece.search(/^b/) !== -1) {
    return false;
  }
};

var makeBestMove = function() {
  var bestMove = getBestMove(game);
  game.ugly_move(bestMove);
  board.position(game.fen());
  renderMoveHistory(game.history());
  if (game.game_over()) {
    alert("Game over");
  }
};

var getBestMove = function(game) {
  if (game.game_over()) {
    alert("Game over");
  }
  var bestMove = calculateBestMove(game);
  return bestMove;
};

var renderMoveHistory = function(moves) {
  var historyElement = $("#move-history").empty();
  historyElement.empty();
  for (var i = 0; i < moves.length; i = i + 2) {
    historyElement.append(" " + moves[i] + " ");
  }
};

var onDrop = function(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: "q",
  });

  removeGreySquares();
  if (move === null) {
    return "snapback";
  }

  renderMoveHistory(game.history());
  window.setTimeout(makeBestMove, 250);
};

var onMouseoverSquare = function(square, piece) {
  var moves = game.moves({
    square: square,
    verbose: true,
  });

  if (moves.length === 0) return;

  greySquare(square);

  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onMouseoutSquare = function(square, piece) {
  removeGreySquares();
};
var removeGreySquares = function() {
  $('#chessBoard .square-55d63').css('background', '');
};

var greySquare = function(square) {
  var squareEl = $('#chessBoard .square-' + square);

  var background = '#a9a9a9';
  if (squareEl.hasClass('black-3c85d') === true) {
    background = '#696969';
  }

  squareEl.css('background', background);
};

var cfg = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: onMouseoutSquare,
  onMouseoverSquare: onMouseoverSquare,
  boardTheme: 'chessBoard',
  orientation: 'white',
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};
board = ChessBoard('chessBoard', cfg);
