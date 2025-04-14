// Напишите функцию inverse, которая меняет порядок элементов в массике на противоположный.
// Если в функцию вторым аргументом передаётся число — то переставляются все элементы массива кроме нескольких первых (количество зависит от числа).
// Если число отрицательное — то на месте остаются элементы в конце массива

function inverse(arr, n) {
  if (!Array.isArray(arr)) {
    throw new Error("Первый аргумент должен быть массивом");
  }

  // Создаем копию, чтобы не изменять оригинальный массив
  const copyArr = [...arr];
  const len = copyArr.length;

  // Если n не предоставлено, не является числом или равно 0,
  // переворачиваем весь массив
  if (typeof n !== 'number' || n === 0) {
    return copyArr.reverse();
  }

  if (n > 0) {
    // n положительное: оставляем первые n элементов
    if (n >= len) {
      // Если n больше или равно длине, массив не меняется
      return copyArr;
    }
    const head = copyArr.slice(0, n);
    const tail = copyArr.slice(n).reverse();
    return head.concat(tail);
  } else {
    // n отрицательное: оставляем последние модуль n элементов
    const absN = Math.abs(n);
    if (absN >= len) {
       // Если модуль n больше или равно длине, массив не меняется
      return copyArr;
    }
    const head = copyArr.slice(0, len - absN).reverse();
    const tail = copyArr.slice(len - absN);
    return head.concat(tail);
  }
}

// Примеры использования:
console.log("inverse([1, 2, 3, 4, 5]):", inverse([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log("inverse([1, 2, 3, 4, 5], 2):", inverse([1, 2, 3, 4, 5], 2)); // [1, 2, 5, 4, 3]
console.log("inverse([1, 2, 3, 4, 5], -2):", inverse([1, 2, 3, 4, 5], -2)); // [3, 2, 1, 4, 5]
console.log("inverse([1, 2, 3, 4, 5], 5):", inverse([1, 2, 3, 4, 5], 5)); // [1, 2, 3, 4, 5] (n >= length)
console.log("inverse([1, 2, 3, 4, 5], -5):", inverse([1, 2, 3, 4, 5], -5)); // [1, 2, 3, 4, 5] (|n| >= length)
console.log("inverse([]):", inverse([])); // []
console.log("inverse([], 2):", inverse([], 2)); // []

// Проверка, что оригинальный массив не изменен
const original = [10, 20, 30, 40];
const result = inverse(original, 1);
console.log("Original array:", original); // [10, 20, 30, 40]
console.log("Result:", result); // [10, 40, 30, 20]
