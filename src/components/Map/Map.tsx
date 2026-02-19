import styles from "./Map.module.css";
import russiaMap from "../../assets/russiaMap.svg";
import { battles } from "../../data/battles";

// Интерфейс для пропсов - добавляем selectedId и isCorrect
interface MapProps {
  currentBattle: (typeof battles)[0];
  onBattleClick: (battleId: string) => void;
  selectedId: string | null;
  isCorrect: boolean | null;
  isAnswered: boolean;
}

export default function Map({
  currentBattle,
  onBattleClick,
  selectedId,
  isCorrect,
  isAnswered,
}: MapProps) {
  // Функция для определения цвета маркера
  const getMarkerColor = (battleId: string) => {
    // Если это правильный ответ И мы правильно ответили
    if (isAnswered && battleId === currentBattle.id) {
      return "#4caf50"; // зеленый
    }

    // Если это НЕправильный ответ и мы неправильно ответили (кликнули по этой точке)
    if (
      battleId !== currentBattle.id &&
      isCorrect === false &&
      battleId === selectedId
    ) {
      return "#f44336"; // красный (только для выбранной неправильной точки)
    }

    // Все остальные точки - синие
    return "#3b82f6";
  };

  // Обработчик клика по карте
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    // Коэффициенты масштабирования для viewBox
    const viewBoxWidth = 1650;
    const viewBoxHeight = 1000;

    // Один масштаб для обеих осей
    const scale = Math.min(
      rect.width / viewBoxWidth,
      rect.height / viewBoxHeight
    );

    // Смещение, если есть поля (padding) вокруг SVG
    const offsetX = (rect.width - viewBoxWidth * scale) / 2;
    const offsetY = (rect.height - viewBoxHeight * scale) / 2;

    // Координаты клика относительно viewBox
    const svgX = (e.clientX - rect.left - offsetX) / scale;
    const svgY = (e.clientY - rect.top - offsetY) / scale;

    // Проценты
    const xPercent = (svgX / viewBoxWidth) * 100;
    const yPercent = (svgY / viewBoxHeight) * 100;

    const tolerance = 1;
    let clickedBattleId = "";

    battles.forEach((battle) => {
      const dx = Math.abs(battle.coordinates.x - xPercent);
      const dy = Math.abs(battle.coordinates.y - yPercent);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < tolerance) {
        clickedBattleId = battle.id;
      }
    });

    // Вызываем функцию из пропсов
    onBattleClick(clickedBattleId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapWrapper}>
        <img src={russiaMap} alt="Карта России" className={styles.mapImage} />

        <svg
          className={styles.markersLayer}
          onClick={handleSvgClick}
          style={{ cursor: "crosshair" }}
          viewBox="0 0 1650 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Маркеры сражений - с конвертацией */}
          {battles.map((battle) => (
            <g
              key={battle.id}
              transform={`translate(${(battle.coordinates.x / 100) * 1650}, ${
                (battle.coordinates.y / 100) * 1000
              })`}
            >
              <circle
                r="8"
                fill={getMarkerColor(battle.id)}
                stroke="white"
                strokeWidth="2"
                className={`${styles.marker} ${
                  isAnswered ? styles.disabled : ""
                }`}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
