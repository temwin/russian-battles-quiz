import { useState } from "react";
import { battles } from "./data/battles";
import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import Message from "./components/Message/Message";
import Popup from "./components/Popup/Popup";
import styles from "./App.module.css";

const successSound = new Audio(`${import.meta.env.BASE_URL}sounds/success.mp3`);
const errorSound = new Audio(`${import.meta.env.BASE_URL}sounds/error.mp3`);

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // БЛОКИРОВКА ПОСЛЕДУЮЩИХ КЛИКОВ

  const currentBattle = battles[currentIndex];

  // переход к следующему вопросу
  const goToNext = () => {
    if (currentIndex < battles.length - 1) {
      // сбрасываем состояния для нового вопроса
      setCurrentIndex((prev) => prev + 1);
      setSelectedId(null);
      setIsCorrect(null);
      setMessage("");
      setShowPopup(false);
      setIsAnswered(false);
    } else {
      // игра окончена
      setCurrentIndex(battles.length);
    }
  };

  // Закрытие попапа + переход к следующему
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleBattleClick = (battleId: string) => {
    // защита от повторных кликов после любого ответа
    if (isCorrect || isAnswered) return;

    setIsAnswered(true); // блокируем повторные клики после ответа

    setSelectedId(battleId);

    if (battleId === currentBattle.id) {
      successSound.play(); // 🔊 ПОБЕДНЫЙ ЗВУК
      setIsCorrect(true);
      setScore((prev) => prev + 1);
      setMessage("✅ Верно, перейдите к следующему вопросу!");
      setShowPopup(true); // показываем попап
    } else if (battleId !== "") {
      errorSound.play(); // 🔊 ЗВУК ОШИБКИ
      setIsCorrect(false);
      setMessage("❌ Неверно, перейдите к следующему вопросу");
      setShowPopup(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedId(null);
    setIsCorrect(null);
    setMessage("");
    setShowPopup(false);
    setIsAnswered(false);
  };

  // Экран результата
  if (currentIndex >= battles.length) {
    return (
      <div className={styles.resultScreen}>
        <h2>Игра окончена</h2>
        <p>
          Вы правильно ответили на {score} из {battles.length}
        </p>
        <button onClick={handleRestart} className={styles.restartButton}>
          Сыграть ещё
        </button>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header
          currentNumber={currentIndex + 1}
          totalNumber={battles.length}
          score={score}
          battleName={currentBattle.name}
          battleDate={currentBattle.date}
        />

        {message && (
          <div className={styles.messageOverlay}>
            <Message text={message} type={isCorrect ? "success" : "error"} />
          </div>
        )}

        <Map
          currentBattle={currentBattle}
          onBattleClick={handleBattleClick}
          selectedId={selectedId}
          isCorrect={isCorrect}
          isAnswered={isAnswered}
        />

        {/* Всплывающее окно с описанием */}
        {showPopup && (
          <Popup battle={currentBattle} onClose={handleClosePopup} />
        )}
        {/* Кнопка следующего сражения */}
        {isAnswered && (
          <div className={styles.nextOverlay}>
            <button onClick={goToNext} className={styles.nextButton}>
              {currentIndex === battles.length - 1
                ? "Увидеть итоги →"
                : "Следующее сражение →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
