import styles from "./Header.module.css";

interface HeaderProps {
  currentNumber: number;
  totalNumber: number;
  score: number;
  battleName: string;
  battleDate: string;
}

export default function Header({
  currentNumber,
  totalNumber,
  score,
  battleName,
  battleDate,
}: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <span className={styles.counter}>
          Вопрос {currentNumber} из {totalNumber}
        </span>
        <span className={styles.score}>Счет: {score}</span>
      </div>

      <h1 className={styles.question}>
        Где произошло сражение:{" "}
        <span className={styles.battleName}>{battleName}</span>?
      </h1>

      <p className={styles.date}>{battleDate}</p>
    </div>
  );
}
