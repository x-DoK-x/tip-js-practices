"use strict";

// Вариант 4: totalTasks = 20, completedTasks = 11, dailyLimit = 6.
const totalTasks = 20;
const completedTasks = 11;
const dailyLimit = 6;

if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  console.log("Ошибка: количество задач должно быть целым числом");
} else if (totalTasks < 0 || totalTasks > 1000) {
  console.log("Ошибка: общее количество задач должно быть в диапазоне от 0 до 1000");
} else if (completedTasks < 0 || completedTasks > totalTasks) {
  console.log("Ошибка: выполненных задач не может быть больше общего количества");
} else if (!Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 1000) {
  console.log("Ошибка: дневная норма должна быть целым числом от 1 до 1000");
} else {
  let remainingTasks = totalTasks - completedTasks;

  console.log(`Осталось задач: ${remainingTasks}`);

  if (remainingTasks === 0) {
    console.log("Все задачи уже выполнены");
    console.log("Потребуется дней: 0");
  } else {
    let day = 0;

    while (remainingTasks > 0) {
      day += 1;

      // За последний день нельзя выполнить больше задач, чем осталось.
      const tasksPerDay = Math.min(dailyLimit, remainingTasks);
      remainingTasks -= tasksPerDay;

      console.log(`День ${day}: выполнено ${tasksPerDay}, осталось ${remainingTasks}`);
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
