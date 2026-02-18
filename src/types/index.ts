// Описание одного сражения
export interface Battle {
    id: string;           // уникальный номер
    name: string;         // название
    description: string;  // описание
    date: string;         // дата
    city: string;         // город/регион
    coordinates: {        // координаты на SVG (будем подбирать позже)
      x: number;          // от 0 до 100 (проценты)
      y: number;
    };
    image?: string;  
  }