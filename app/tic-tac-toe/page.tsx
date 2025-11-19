"use client";

import { useState, useEffect } from "react";
import styles from "./tic-tac-toe.module.css";

type SquareValue = "X" | "O" | null;

function calculateWinner(squares: SquareValue[]): SquareValue | null {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToePage() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((sq) => sq !== null);

  let status: string;
  if (winner) {
    status = `המנצח/ת: ${winner}`;
  } else if (isBoardFull) {
    status = "תיקו!";
  } else {
    status = `התור הבא: ${xIsNext ? "X" : "O"}`;
  }

  // שימוש קטן ב-useEffect כמו שביקשו – שינוי כותרת החלון
  useEffect(() => {
    if (winner) {
      document.title = `איקס־עיגול – ${winner} ניצח/ה`;
    } else {
      document.title = "איקס־עיגול";
    }
  }, [winner]);

  function handleClick(index: number) {
    if (squares[index] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <div>
            <p className={styles.badge}>ברוכים הבאים למשחק...</p>
            <h1 className={styles.title}>איקס עיגול!</h1>
          </div>
        </header>

        <div className={styles.status}>{status}</div>

        <div className={styles.boardWrapper}>
          <div className={styles.board}>
            {squares.map((value, index) => (
              <button
                key={index}
                className={styles.square}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.resetButton} onClick={handleReset}>
          משחק חדש
        </button>
      </section>
    </main>
  );
}
