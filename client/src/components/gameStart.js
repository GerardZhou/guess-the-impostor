import styles from "./gameStart.module.css";

export default function GameStart({ players, numPlayers }) {
  return (
    <div className={styles.gameContainer}>
      <h2 className={styles.heading}>Roles Revealed!</h2>
      <ul className={styles.playerList}>
        {players.map((player) => (
          <li
            key={player.id}
            className={`${styles.playerItem} ${
              player.role === "Impostor" ? styles.impostor : ""
            }`}
          >
            Player {player.id}: <strong>{player.role}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
