// Демонстрационный сценарий ПР2. Все вычисления выполняются в task-service.js,
// здесь только последовательность действий и вывод результатов.
import { demoTasks, variantNumber, variantTasks } from "./data.js";
import { searchTasks } from "./task-extra.js";
import {
  addTask,
  findTaskById,
  getPendingTasks,
  getTaskStats,
  getTaskTitles,
  removeTask,
  renameTask,
  setTaskCompleted,
} from "./task-service.js";

const idsOf = (tasks) => tasks.map((task) => task.id).join(", ");

// Деструктуризация сводки применяется при выводе; сама сводка считается в сервисе.
function printState(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);

  console.log(`${label}: всего ${total}; выполнено ${completed}; осталось ${pending}`);
  if (total === 0) {
    console.log("  Задач пока нет");
  } else {
    console.log(`  Прогресс: ${progress.toFixed(1)}%`);
  }
  console.log(`  Идентификаторы: [${idsOf(tasks)}]`);
}

// Выполняет операцию сервиса и печатает результат.
// При отказе состояние не заменяется: result.tasks в этом случае не существует.
function perform(state, label, operation) {
  const result = operation();

  if (!result.ok) {
    console.log(`\n[отказ] ${label}`);
    console.log(`  Причина: ${result.error}`);
    console.log("  Текущее состояние не изменено.");
    printState("  Состояние", state);
    return state;
  }

  console.log(`\n[успех] ${label}`);
  printState("  Состояние", result.tasks);
  return result.tasks;
}

console.log("=".repeat(72));
console.log("ПР2. Общий демонстрационный сценарий (набор demoTasks)");
console.log("=".repeat(72));

const demoTasksSnapshot = JSON.stringify(demoTasks);

console.log("Исходные задачи:");
console.table(demoTasks);
console.log(`Названия задач: ${JSON.stringify(getTaskTitles(demoTasks))}`);
console.log(`Невыполненные идентификаторы: [${idsOf(getPendingTasks(demoTasks))}]`);
printState("Исходная сводка", demoTasks);

let currentTasks = demoTasks;

currentTasks = perform(currentTasks, "Добавление задачи id = 20 «Добавить проверку», приоритет high", () =>
  addTask(currentTasks, 20, "Добавить проверку", "high"));

currentTasks = perform(currentTasks, "Установка completed = true для задачи id = 4", () =>
  setTaskCompleted(currentTasks, 4, true));

currentTasks = perform(currentTasks, "Переименование задачи id = 10", () =>
  renameTask(currentTasks, 10, "Подготовить инструкцию запуска"));

currentTasks = perform(currentTasks, "Удаление задачи id = 7", () =>
  removeTask(currentTasks, 7));

console.log("\n--- Обработанные отказы: состояние должно сохраниться ---");

currentTasks = perform(currentTasks, "Повторное добавление уже существующего id = 20", () =>
  addTask(currentTasks, 20, "Дубликат", "low"));

currentTasks = perform(currentTasks, "Статус задан строкой \"true\" для id = 4", () =>
  setTaskCompleted(currentTasks, 4, "true"));

currentTasks = perform(currentTasks, "Изменение отсутствующей задачи id = 777", () =>
  setTaskCompleted(currentTasks, 777, true));

console.log("\nИтоговое состояние общего сценария:");
console.table(currentTasks);
printState("Итоговая сводка", currentTasks);
console.log(`Название задачи id = 10: ${findTaskById(currentTasks, 10).title}`);
console.log(`Исходный demoTasks не изменён: ${JSON.stringify(demoTasks) === demoTasksSnapshot}`);
console.table(demoTasks);

console.log("\n" + "=".repeat(72));
console.log(`ПР2. Индивидуальный сценарий, вариант ${variantNumber}: «Подготовка семинара»`);
console.log("=".repeat(72));

const variantSnapshot = JSON.stringify(variantTasks);

console.log("Исходные задачи варианта:");
console.table(variantTasks);
printState("Исходная сводка варианта", variantTasks);

let currentVariant = variantTasks;

currentVariant = perform(currentVariant, "Добавление задачи id = 80 «Провести репетицию семинара», приоритет high", () =>
  addTask(currentVariant, 80, "Провести репетицию семинара", "high"));

currentVariant = perform(currentVariant, "Установка completed = true для задачи id = 11", () =>
  setTaskCompleted(currentVariant, 11, true));

currentVariant = perform(currentVariant, "Переименование задачи id = 23", () =>
  renameTask(currentVariant, 23, "Составить план выступления и тайминг"));

currentVariant = perform(currentVariant, "Удаление задачи id = 37", () =>
  removeTask(currentVariant, 37));

console.log("\n--- Обработанный отказ ---");

currentVariant = perform(currentVariant, "Повторное добавление id = 80", () =>
  addTask(currentVariant, 80, "Повтор", "high"));

console.log("\nИтоговое состояние сценария варианта:");
console.table(currentVariant);
printState("Итоговая сводка варианта", currentVariant);
console.log(`Исходный variantTasks не изменён: ${JSON.stringify(variantTasks) === variantSnapshot}`);
console.table(variantTasks);

console.log("\n" + "=".repeat(72));
console.log("ПР2. Дополнительное задание, вариант А: поиск по части названия");
console.log("=".repeat(72));

const queries = [" ФУНК ", "ПОДГОТОВИТЬ", "несуществующий фрагмент", "", "   "];
for (const query of queries) {
  const found = searchTasks(demoTasks, query);
  console.log(`Запрос ${JSON.stringify(query)} → идентификаторы [${idsOf(found)}]`);
}
console.log(`Поиск в пустом списке: [${idsOf(searchTasks([], "задача"))}]`);
console.log(`Исходный demoTasks не изменён: ${JSON.stringify(demoTasks) === demoTasksSnapshot}`);
