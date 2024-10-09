import React from "react";

export default function GameBoard({ onSelectedPlayer, board }) {
  //   const [gameBoard, setGameBoard] = useState(initialGameBoard);

  //   function handleSelectSquare(rowIndex, colIndex) {
  //     // setGameBoard((preGameBoard) => {
  //     //   const updateGameboard = [...preGameBoard.map((update) => [...update])];
  //     //   updateGameboard[rowIndex][colIndex] = playerSymbolActive;
  //     //   return updateGameboard;
  //     // });
  //     onSelectedPlayer();
  //   }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((col, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectedPlayer(rowIndex, colIndex)}
                  disabled={col !== null}
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
