// Дополнительное задание ПР2, вариант А: поиск задач по части названия.
// Контракты девяти обязательных функций модуль не изменяет.

export function searchTasks(tasks, query) {
  const text = typeof query === "string" ? query.trim().toLowerCase() : "";

  // Пустой или пробельный запрос возвращает новый массив всех задач.
  if (text.length === 0) {
    return [...tasks];
  }

  return tasks.filter((task) => task.title.toLowerCase().includes(text));
}
