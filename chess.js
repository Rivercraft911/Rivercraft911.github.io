document.addEventListener("DOMContentLoaded", function () {
  const boardConfig = {
    draggable: true,
    position: "start",
    onDrop: onDrop
  };

  const board = Chessboard("myBoard", boardConfig);
  const game = new Chess();

  function onDrop(source, target) {
    const move = game.move({
      from: source,
      to: target,
      promotion: "q"
    });

    if (move === null) {
      return "snapback";
    }
  }

  function newGame() {
    game.reset();
    board.position(game.fen());
  }

  document.getElementById("newGameBtn").addEventListener("click", newGame);
});
