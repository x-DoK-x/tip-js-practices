// Общий контрольный набор. Для своего варианта ниже предусмотрен отдельный массив.
// Идентификатор задачи не совпадает с её индексом в массиве.
export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

// Индивидуальный вариант 4: тема «Подготовка семинара», изначально выполнены
// первые K = 3 задачи из шести. Новая задача варианта — id = 80, приоритет high.
export const variantNumber = 4;

export const variantTasks = [
  { id: 11, title: "Собрать материалы для семинара", completed: true, priority: "high" },
  { id: 23, title: "Составить план выступления", completed: true, priority: "medium" },
  { id: 37, title: "Подготовить презентацию", completed: true, priority: "low" },
  { id: 41, title: "Проверить оборудование аудитории", completed: false, priority: "high" },
  { id: 58, title: "Собрать вопросы участников", completed: false, priority: "medium" },
  { id: 64, title: "Отправить материалы участникам", completed: false, priority: "low" },
];
