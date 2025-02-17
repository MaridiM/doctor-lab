/**
 * Определяет, является ли цвет тёмным на основе его яркости.
 *
 * @param {string} rgbHex - Цвет в формате HEX (например, "#1a73e8").
 * @returns {boolean} Возвращает `true`, если цвет тёмный, иначе `false`.
 *
 * @example
 * // Тёмный цвет
 * const isDark = isDarkColor("#1a73e8");
 * console.log(isDark); // true
 *
 * @example
 * // Светлый цвет
 * const isDark = isDarkColor("#f1c40f");
 * console.log(isDark); // false
 *
 * @description
 * Функция вычисляет яркость цвета на основе стандартного расчёта W3C:
 *   - Яркость рассчитывается как взвешенное среднее значений RGB.
 *   - Весовые коэффициенты для R, G, B:
 *     - Красный (R): 299
 *     - Зелёный (G): 587
 *     - Синий (B): 114
 *   - Яркость = (R * 299 + G * 587 + B * 114) / 1000
 *   - Если яркость меньше 128, цвет считается тёмным.
 *
 * Используется для выбора цвета текста (светлый или тёмный), чтобы он хорошо контрастировал с фоном.
 */
export function isDarkColor(rgbHex: string): boolean {
    // Удаляем '#' в начале HEX-строки
    const hex = rgbHex.replace('#', '');

    // Разбиваем цвет на R, G, B компоненты
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Рассчитываем относительную яркость (по стандарту W3C)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Если яркость ниже 164, считаем цвет тёмным
    return brightness < 128;
}
