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
    const hex = rgbHex.replace('#', '')

    // Разбиваем цвет на R, G, B компоненты
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)

    // Рассчитываем относительную яркость (по стандарту W3C)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000

    // Если яркость ниже 164, считаем цвет тёмным
    return brightness < 128
}

/**
 * Генерирует случайный цвет в формате `rgb` или `hex`.
 *
 * @param {boolean} rgb - Указывает формат возвращаемого цвета:
 *   - Если `true`, возвращается цвет в формате `rgb(r, g, b)` с увеличенной яркостью.
 *   - Если `false` (по умолчанию), возвращается цвет в формате `hex` (`#RRGGBB`) с увеличенной яркостью.
 * @returns {string} Сгенерированный цвет:
 *   - Формат `rgb(r, g, b)` (например, "rgb(255, 200, 180)") при `rgb = true`.
 *   - Формат `hex` (например, "#ffc8b4") при `rgb = false`.
 *
 * @example
 * // Генерация цвета в формате RGB
 * const rgbColor = generateColor(true);
 * console.log(rgbColor); // Пример: "rgb(255, 200, 180)"
 *
 * @example
 * // Генерация цвета в формате HEX
 * const hexColor = generateColor();
 * console.log(hexColor); // Пример: "#ffc8b4"
 *
 * @description
 * Функция генерирует случайные значения для компонентов цвета (красный, зелёный, синий)
 * в диапазоне от 0 до 255, затем увеличивает их яркость, добавляя 50 (но не превышая 255).
 * Это позволяет создавать более яркие и насыщенные цвета.
 *
 * Используется для генерации случайных цветов, подходящих для динамического стилизования UI-элементов,
 * фонов, аватаров и других визуальных компонентов.
 */
export function generateColor(rgb: boolean = false): string {
    if (rgb) {
        // Генерируем случайные значения для RGB
        const r = Math.floor(Math.random() * 256) // Красный (0-255)
        const g = Math.floor(Math.random() * 256) // Зелёный (0-255)
        const b = Math.floor(Math.random() * 256) // Синий (0-255)

        // Добавляем яркости
        const brighten = (color: number) => Math.min(color + 50, 255)

        return `rgb(${brighten(r)}, ${brighten(g)}, ${brighten(b)})`
    }

    // Функция для генерации случайного значения в диапазоне от 0 до 255
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)

    const brighten = (color: number) => Math.min(color + 50, 255)

    // Преобразуем в HEX
    const toHex = (color: number) => color.toString(16).padStart(2, '0')

    return `#${toHex(brighten(r))}${toHex(brighten(g))}${toHex(brighten(b))}`
}
