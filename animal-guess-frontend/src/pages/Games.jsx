// src/pages/Games.jsx
export default function Games() {
  const gameList = ["Guess Animal","Chess", "Sudoku", "Snake", "Tic-Tac-Toe", "Memory Match"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Games</h2>
      <ul>
        {gameList.map((game, index) => (
          <li key={index}>{game}</li>
        ))}
      </ul>
    </div>
  );
}
