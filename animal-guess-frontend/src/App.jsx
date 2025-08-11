import React from "react";
import AnimalGuess from "./components/AnimalGuess";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <AnimalGuess />
    </div>
  );
}