"use strict";

// Задание 2. Для каждого выражения сначала записан прогноз (в комментарии),
// затем фактический вывод значения и типа результата.

console.log("1. \"8\" + 2");
console.log("   Значение:", "8" + 2); // прогноз: "82" — конкатенация строки и числа
console.log("   Тип:", typeof ("8" + 2)); // string

console.log("2. \"8\" - 2");
console.log("   Значение:", "8" - 2); // прогноз: 6 — минус преобразует строку в число
console.log("   Тип:", typeof ("8" - 2)); // number

console.log("3. Number(\"8\") + 2");
console.log("   Значение:", Number("8") + 2); // прогноз: 10 — явное преобразование
console.log("   Тип:", typeof (Number("8") + 2)); // number

console.log("4. \"12\" > \"3\"");
console.log("   Значение:", "12" > "3"); // прогноз: false — сравнение строк посимвольно
console.log("   Тип:", typeof ("12" > "3")); // boolean

console.log("5. 12 === \"12\"");
console.log("   Значение:", 12 === "12"); // прогноз: false — строгое равенство без преобразования
console.log("   Тип:", typeof (12 === "12")); // boolean

console.log("6. Number(\"\")");
console.log("   Значение:", Number("")); // прогноз: 0 — пустая строка даёт ноль
console.log("   Тип:", typeof Number("")); // number

console.log("7. Number(\"text\")");
console.log("   Значение:", Number("text")); // прогноз: NaN — строка не преобразуется
console.log("   Тип:", typeof Number("text")); // number

console.log("8. Boolean(\"false\")");
console.log("   Значение:", Boolean("false")); // прогноз: true — непустая строка истинна
console.log("   Тип:", typeof Boolean("false")); // boolean

console.log("9. typeof null");
console.log("   Значение:", typeof null); // прогноз: "object" — особая особенность языка
console.log("   Тип самого результата:", typeof (typeof null)); // string

console.log("10. typeof NaN");
console.log("   Значение:", typeof NaN); // прогноз: "number" — NaN относится к числам
console.log("   Тип самого результата:", typeof (typeof NaN)); // string
