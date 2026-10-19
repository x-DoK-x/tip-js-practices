"use strict";

// Вариант 4: totalTasks = 20, completedTasks = 11.
const totalTasks = 20;
const completedTasks = 11;

// Проверки выполняются по порядку: сначала типы и целочисленность,
// затем диапазоны. Строки автоматически не преобразуются.
if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  console.log("Ошибка: количество задач должно быть целым числом");
} else if (totalTasks < 0 || totalTasks > 1000) {
  console.log("Ошибка: общее количество задач должно быть в диапазоне от 0 до 1000");
} else if (completedTasks < 0 || completedTasks > totalTasks) {
  console.log("Ошибка: выполненных задач не может быть больше общего количества");
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const progress = (completedTasks / totalTasks) * 100;

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remainingTasks}`);
  console.log(`Прогресс: ${progress.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
