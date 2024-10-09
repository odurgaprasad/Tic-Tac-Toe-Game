import React, { useState } from "react";
import Players from "./components/Players";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../src/winning-combinations";
import Gameover from "./components/Gameover";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentGamePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentGamePlayer = "O";
  }
  return currentGamePlayer;
}

function App() {
  const [newName1, setNewName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const gameBoard = [...initialGameBoard.map((restart) => [...restart])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = newName1[firstSquareSymbol];
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNewName(symbol, newName) {
    setNewName((prevName) => {
      return {
        ...prevName,
        [symbol]: newName,
      };
    });
  }

  function handleCurrentPlayer(rowIndex, colIndex) {
    // setActivePlayer((CurrPlayerActive) =>
    //   CurrPlayerActive === "X" ? "O" : "X"
    // );
    setGameTurns((preGameTurns) => {
      const currentGamePlayer = derivedActivePlayer(preGameTurns);
      let updateGamePlayer = [
        { square: { row: rowIndex, col: colIndex }, player: currentGamePlayer },
        ...preGameTurns,
      ];
      return updateGamePlayer;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName="player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNewName}
          />
          <Players
            initialName="player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNewName}
          />
        </ol>
        {(winner || isDraw) && (
          <Gameover winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectedPlayer={handleCurrentPlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} id="log" />
    </main>
  );
}

export default App;
