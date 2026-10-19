// Дополнительное задание ПР3, вариант А: совместный фильтр по приоритету.
// Отдельный модуль: обязательные функции и их контракты не изменяются.

const PRIORITY_FILTERS = ["all", "low", "medium", "high"];

export function isPriorityFilter(value) {
  return PRIORITY_FILTERS.includes(value);
}

// Возвращает новый массив: задачи выбранного приоритета либо все записи.
// Исходные объекты и их порядок сохраняются.
export function filterByPriority(tasks, priority = "all") {
  if (priority === "all" || !isPriorityFilter(priority)) {
    return [...tasks];
  }

  return tasks.filter((task) => task.priority === priority);
}
