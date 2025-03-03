import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import GameStart from "./components/gameStart";

// const apiCall = () => {
//   axios.get("http://localhost:8080").then((data) => {
//     console.log(data);
//   });
// };

function App() {
  const [numPlayers, setNumPlayers] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    if (numPlayers < 2) {
      alert("You need at least 2 players");
      return;
    }
    let players = Array.from({ length: numPlayers }, (_, i) => ({
      id: i + 1,
      role: "Crewmate",
    }));

    const impostorIdx = Math.floor(Math.random() * numPlayers);
    players[impostorIdx].role = "Impostor";

    setPlayers(players);
    setGameStarted(true);
  };

  return (
    <div className="container">
      <h1>Guess the Impostor</h1>
      {!gameStarted ? (
        <div>
          <input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(e.target.value)}
            placeholder="Enter number of players"
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <GameStart players={players} numPlayers={numPlayers} />
      )}
    </div>
  );
}

export default App;
