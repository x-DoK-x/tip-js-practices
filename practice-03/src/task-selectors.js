// Отбор задач по фильтру. Модуль не изменяет входной массив и не работает с DOM.
// Допустимые значения filter: "all", "pending", "completed".
export function getVisibleTasks(tasks, filter = "all") {
  if (filter === "pending") {
    return tasks.filter((task) => task.completed === false);
  }

  if (filter === "completed") {
    return tasks.filter((task) => task.completed === true);
  }

  // Режим "all", а также любое неизвестное значение: копия исходного массива.
  // Недопустимое значение фильтра отсеивается в обработчике main.js.
  return [...tasks];
}
