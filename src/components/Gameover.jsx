import React from "react";

export default function Gameover({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner}, Won!</p>}
      {!winner && <p>it's a Draw</p>}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
