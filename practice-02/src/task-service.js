// Прикладной модуль ПР2: девять функций работы с задачами.
// Модуль не работает с DOM, ничего не выводит в консоль, не читает внешние
// данные и не хранит собственный изменяемый список: каждая функция получает
// массив задач аргументом и возвращает новый результат.

const PRIORITIES = ["low", "medium", "high"];
const TITLE_MAX_LENGTH = 100;

// Внутренняя проверка идентификатора: число, положительное безопасное целое.
// Строка "4" намеренно не преобразуется в число 4.
function normalizeId(id) {
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0) {
    return { ok: false, error: "Идентификатор должен быть положительным целым числом" };
  }

  return { ok: true, id };
}

// Внутренняя проверка и нормализация названия: строка длиной 1…100 после trim().
// Внутренние пробелы сохраняются, краевые удаляются.
function normalizeTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название задачи должно быть строкой" };
  }

  const value = title.trim();
  if (value.length === 0) {
    return { ok: false, error: "Название задачи не должно быть пустым" };
  }
  if (value.length > TITLE_MAX_LENGTH) {
    return { ok: false, error: `Название задачи не должно быть длиннее ${TITLE_MAX_LENGTH} символов` };
  }

  return { ok: true, title: value };
}

// Приоритет — строго одно из трёх значений; приведение типов не выполняется.
function normalizePriority(priority) {
  if (!PRIORITIES.includes(priority)) {
    return { ok: false, error: "Приоритет должен быть одним из значений: low, medium, high" };
  }

  return { ok: true, priority };
}

// Создание новой задачи. Всегда возвращается новый объект с completed: false.
export function createTask(id, title, priority = "medium") {
  const idCheck = normalizeId(id);
  if (!idCheck.ok) {
    return idCheck;
  }

  const titleCheck = normalizeTitle(title);
  if (!titleCheck.ok) {
    return titleCheck;
  }

  const priorityCheck = normalizePriority(priority);
  if (!priorityCheck.ok) {
    return priorityCheck;
  }

  return {
    ok: true,
    task: {
      id: idCheck.id,
      title: titleCheck.title,
      completed: false,
      priority: priorityCheck.priority,
    },
  };
}

// Поиск по идентификатору, а не по индексу массива.
// Возвращается найденный объект (не копия) либо undefined.
export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

// Новый массив невыполненных задач в исходном порядке.
export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

// Новый массив названий всех задач в исходном порядке.
export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

// Сводка по переданному массиву. progress — число без предварительного округления.
export function getTaskStats(tasks) {
  let completed = 0;

  for (const task of tasks) {
    if (task.completed === true) {
      completed += 1;
    }
  }

  const total = tasks.length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;

  return { total, completed, pending, progress };
}

// Добавление задачи в конец нового массива. Уникальность id проверяется здесь,
// потому что createTask ещё не знает о существующем списке.
export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) {
    return created;
  }

  if (findTaskById(tasks, created.task.id) !== undefined) {
    return { ok: false, error: `Задача с идентификатором ${created.task.id} уже есть в списке` };
  }

  return { ok: true, tasks: [...tasks, created.task] };
}

// Изменение только признака выполнения выбранной задачи.
export function setTaskCompleted(tasks, id, completed) {
  const idCheck = normalizeId(id);
  if (!idCheck.ok) {
    return idCheck;
  }

  if (typeof completed !== "boolean") {
    return { ok: false, error: "Статус должен быть логическим значением true или false" };
  }

  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: `Задача с идентификатором ${id} не найдена` };
  }

  const next = tasks.map((task) => (task.id === id ? { ...task, completed } : task));

  return { ok: true, tasks: next };
}

// Изменение только названия выбранной задачи, остальные поля сохраняются.
export function renameTask(tasks, id, title) {
  const idCheck = normalizeId(id);
  if (!idCheck.ok) {
    return idCheck;
  }

  const titleCheck = normalizeTitle(title);
  if (!titleCheck.ok) {
    return titleCheck;
  }

  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: `Задача с идентификатором ${id} не найдена` };
  }

  const next = tasks.map((task) => (task.id === id ? { ...task, title: titleCheck.title } : task));

  return { ok: true, tasks: next };
}

// Удаление выбранной задачи с сохранением порядка остальных записей.
export function removeTask(tasks, id) {
  const idCheck = normalizeId(id);
  if (!idCheck.ok) {
    return idCheck;
  }

  if (findTaskById(tasks, id) === undefined) {
    return { ok: false, error: `Задача с идентификатором ${id} не найдена` };
  }

  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}
