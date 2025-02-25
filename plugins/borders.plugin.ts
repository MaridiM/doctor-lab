import plugin from 'tailwindcss/plugin'
import { PluginAPI } from 'tailwindcss/types/config'

// Определяем типы для наших объектов
type DirectiveValue = string | string[]
interface Directives {
    [key: string]: DirectiveValue
}

const directives: Directives = {
    '': 'all', // все стороны (на самом деле не используется, но для заполнения)
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
    x: ['left', 'right'],
    y: ['top', 'bottom'],
    tl: ['top', 'left'],
    tr: ['top', 'right'],
    bl: ['bottom', 'left'],
    br: ['bottom', 'right']
}

type SizeValue = string
interface Sizes {
    [key: string]: SizeValue
}

const sizes: Sizes = {
    '': '1px',
    '4xs': '0.1px',
    '3xs': '0.25px',
    '2xs': '0.5px',
    xs: '0.75px',
    sm: '1px',
    md: '1.5px',
    lg: '2px'
}

type OpacityValue = number
interface Opacities {
    [key: string]: OpacityValue
}

const opacities: Opacities = {
    '': 1,
    '05': 0.05,
    '10': 0.1,
    '15': 0.15,
    '20': 0.2,
    '25': 0.25,
    '30': 0.3,
    '40': 0.4,
    '50': 0.5,
    '60': 0.6,
    '70': 0.7,
    '75': 0.75,
    '80': 0.8,
    '85': 0.85,
    '90': 0.9,
    '95': 0.95,
    '100': 1
}

type ColorValue = string
interface Colors {
    [key: string]: ColorValue
}

const colors: Colors = {
    '': 'var(--border-color)', // значение по умолчанию
    white: 'var(--rgb-white)',
    dark: 'var(--rgb-dark)',
    primary: 'var(--rgb-primary)',
    secondary: 'var(--rgb-secondary)',
    ettention: 'var(--rgb-ettention)',
    positive: 'var(--rgb-positive)',
    negative: 'var(--rgb-negative)',
    gray: 'var(--rgb-gray)'
}

const specials: string[] = ['', 'none', 'transparent', 'inset']

export default plugin(function ({ addUtilities }: PluginAPI) {
    // Тип для нового набора утилит: ключ — имя класса, значение — объект стилей
    const newUtilities: { [className: string]: Record<string, string> } = {}

    Object.keys(directives).forEach(dirKey => {
        Object.keys(sizes).forEach(sizeKey => {
            Object.keys(opacities).forEach(opKey => {
                Object.keys(colors).forEach(colorKey => {
                    specials.forEach(special => {
                        // Формирование имени класса по шаблону
                        let className = `.border`
                        if (dirKey) className += `-${dirKey}`
                        if (sizeKey) className += `-${sizeKey}`
                        if (opKey) className += `-${opKey}`
                        if (colorKey) className += `-${colorKey}`
                        if (special) className += `-${special}`

                        // Обработка специальных модификаторов
                        if (special === 'none') {
                            newUtilities[className] = {
                                border: 'none !important'
                            }
                            return
                        }

                        // Определяем стиль бордера
                        const borderStyle = special === 'inset' ? 'inset' : 'solid'

                        // Формирование цвета границы
                        let borderColor: string
                        if (special === 'transparent') {
                            borderColor = 'transparent'
                        } else {
                            // Предполагается, что значение из colors уже в формате rgb,
                            // либо содержит CSS-переменную, которую можно использовать в rgba()
                            borderColor = `rgba(${colors[colorKey]}, ${opacities[opKey]})`
                        }

                        // Генерация CSS-правил в зависимости от значения директивы
                        if (dirKey === '') {
                            // Для всех сторон
                            newUtilities[className] = {
                                border: `${sizes[sizeKey]} ${borderStyle} ${borderColor}`
                            }
                        } else if (['x', 'y'].includes(dirKey)) {
                            // Для горизонтальных/вертикальных сторон
                            const props = directives[dirKey]
                            const rule: Record<string, string> = {}
                            if (Array.isArray(props)) {
                                props.forEach(prop => {
                                    rule[`border-${prop}`] = `${sizes[sizeKey]} ${borderStyle} ${borderColor}`
                                })
                            }
                            newUtilities[className] = rule
                        } else if (['t', 'r', 'b', 'l'].includes(dirKey)) {
                            // Для одной стороны
                            newUtilities[className] = {
                                [`border-${directives[dirKey]}`]: `${sizes[sizeKey]} ${borderStyle} ${borderColor}`
                            }
                        } else {
                            // Для углов (tl, tr, bl, br)
                            const props = directives[dirKey]
                            const rule: Record<string, string> = {}
                            if (Array.isArray(props)) {
                                props.forEach(prop => {
                                    rule[`border-${prop}`] = `${sizes[sizeKey]} ${borderStyle} ${borderColor}`
                                })
                            }
                            newUtilities[className] = rule
                        }
                    })
                })
            })
        })
    })

    addUtilities(newUtilities, { respectImportant: true, respectPrefix: true })
})
