import { useState } from "react";

export default function Players({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, SetPlayerName] = useState(initialName);

  function handlePlayerName() {
    setIsEditing((preViousClick) => !preViousClick);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function changePlayerName(e) {
    SetPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={changePlayerName} />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handlePlayerName}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
