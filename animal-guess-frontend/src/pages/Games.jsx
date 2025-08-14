import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();
  const gameList = [
    { name: "Guess Animal", path: "/guess-animal" },
    { name: "Chess", path: "/chess" },
    { name: "Sudoku", path: "/sudoku" },
    { name: "Snake", path: "/snake" },
    { name: "Tic-Tac-Toe", path: "/tic-tac-toe" },
    { name: "Memory Match", path: "/memory-match" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Games</h2>
      <ul>
        {gameList.map((game, index) => (
          <li key={index} style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate(game.path)}>
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
