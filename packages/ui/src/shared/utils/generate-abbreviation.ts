/**
 * Генерирует аббревиатуру на основе входной строки.
 *
 * @param {string} input - Входная строка, содержащая одно или несколько слов.
 * @returns {string} Аббревиатура, сформированная по следующим правилам:
 *   - Если строка содержит одно слово, возвращаются первые два символа слова в верхнем регистре.
 *   - Если строка содержит два или более слов, возвращаются первые символы первых двух слов в верхнем регистре.
 *   - Если строка пуста, возвращается пустая строка.
 *
 * @example
 * // Одно слово
 * const abbreviation1 = generateAbbreviation("MaridiM");
 * console.log(abbreviation1); // "MA"
 *
 * @example
 * // Два слова
 * const abbreviation2 = generateAbbreviation("MaridiM ronald");
 * console.log(abbreviation2); // "MR"
 *
 * @example
 * // Три и более слов
 * const abbreviation3 = generateAbbreviation("MaridiM ronald frank");
 * console.log(abbreviation3); // "MR"
 *
 * @example
 * // Пустая строка
 * const abbreviation4 = generateAbbreviation("");
 * console.log(abbreviation4); // ""
 *
 * @description
 * Функция полезна для создания сокращений, отображаемых в аватарах, ярлыках и других UI элементах.
 * Она обрабатывает строку, извлекая первые буквы из одного или двух слов,
 * в зависимости от длины строки.
 */
export function generateAbbreviation(input: string): string {
  // Разбиваем строку на слова
  const words: string[] = input.split(" ");

  if (words.length === 1) {
    // Если одно слово, возвращаем первые два символа
    return words?.[0]?.slice(0, 2).toUpperCase() ?? "";
  } else if (words.length >= 2) {
    // Если два или больше слов, берём по первому символу из первых двух слов
    return (words?.[0]?.[0] ?? "") + (words?.[1]?.[0] ?? "");
  }

  // Если строка пуста или не подходит под условия, возвращаем пустую строку
  return "";
}
