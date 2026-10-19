"use strict";

// Дополнительное задание, вариант А. Количества приходят строками.
// Одного Number() недостаточно: Number("") и Number("   ") дают 0, поэтому
// пустой ввод превратился бы в «Задач пока нет», а Number("Infinity") даёт
// бесконечность, которая тоже является числом. Поэтому сначала проверяется
// тип и непустой ввод после trim(), затем целочисленность и границы.

function parseCount(value, fieldName) {
  if (typeof value !== "string") {
    const actual = value === null ? "null" : typeof value;
    return { ok: false, error: `${fieldName}: ожидалась строка, получено ${actual}` };
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: `${fieldName}: пустая строка` };
  }

  const number = Number(trimmed);
  if (!Number.isInteger(number)) {
    return { ok: false, error: `${fieldName}: "${trimmed}" не является целым числом` };
  }

  return { ok: true, value: number };
}

function printSummary(totalText, completedText) {
  console.log(`Вход: totalTasks = ${JSON.stringify(totalText)}, completedTasks = ${JSON.stringify(completedText)}`);

  const total = parseCount(totalText, "totalTasks");
  if (!total.ok) {
    console.log(`Ошибка: ${total.error}`);
    console.log("");
    return;
  }

  const completed = parseCount(completedText, "completedTasks");
  if (!completed.ok) {
    console.log(`Ошибка: ${completed.error}`);
    console.log("");
    return;
  }

  const totalTasks = total.value;
  const completedTasks = completed.value;

  if (totalTasks < 0 || totalTasks > 1000) {
    console.log("Ошибка: общее количество задач должно быть в диапазоне от 0 до 1000");
  } else if (completedTasks < 0 || completedTasks > totalTasks) {
    console.log("Ошибка: выполненных задач не может быть больше общего количества");
  } else if (totalTasks === 0) {
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

  console.log("");
}

const checks = [
  ["12", "5"],
  [" 12 ", " 5 "],
  ["", "5"],
  ["   ", "5"],
  ["abc", "5"],
  ["2.5", "1"],
  ["Infinity", "0"],
  ["0", "0"],
  ["5", "6"],
  [null, "5"],
  [undefined, "5"],
];

for (const [totalText, completedText] of checks) {
  printSummary(totalText, completedText);
}
