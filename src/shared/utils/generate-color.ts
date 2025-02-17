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
