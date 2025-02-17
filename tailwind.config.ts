import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', { raw: String.raw`group-data-\[.*?\]:border.*` }],
    theme: {
        extend: {
            colors: {
                white: 'var(--white)',
                dark: 'var(--dark)',
                hover: 'var(--hover)',

                background: 'var(--background)',
                foreground: 'var(--foreground)',

                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)'
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)'
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    hover: 'var(--primary-hover)',
                    disabled: 'var(--primary-disabled)',
                    foreground: 'var(--primary-foreground)',

                    '50': 'var(--primary-50)',
                    '100': 'var(--primary-100)',
                    '200': 'var(--primary-200)',
                    '300': 'var(--primary-300)',
                    '400': 'var(--primary-400)',
                    '500': 'var(--primary-500)',
                    '600': 'var(--primary-600)',
                    '700': 'var(--primary-700)',
                    '800': 'var(--primary-800)',
                    '900': 'var(--primary-900)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    hover: 'var(--secondary-hover)',
                    disabled: 'var(--secondary-disabled)',
                    foreground: 'var(--secondary-foreground)',

                    '50': 'var(--secondary-50)',
                    '100': 'var(--secondary-100)',
                    '200': 'var(--secondary-200)',
                    '300': 'var(--secondary-300)',
                    '400': 'var(--secondary-400)',
                    '500': 'var(--secondary-500)',
                    '600': 'var(--secondary-600)',
                    '700': 'var(--secondary-700)',
                    '800': 'var(--secondary-800)',
                    '900': 'var(--secondary-900)',
                    '950': 'var(--secondary-950)'
                },
                positive: {
                    DEFAULT: 'var(--positive)',
                    hover: 'var(--positive-hover)',

                    '50': 'var(--positive-50)',
                    '100': 'var(--positive-100)',
                    '200': 'var(--positive-200)',
                    '300': 'var(--positive-300)',
                    '400': 'var(--positive-400)',
                    '500': 'var(--positive-500)',
                    '600': 'var(--positive-600)',
                    '700': 'var(--positive-700)',
                    '800': 'var(--positive-800)',
                    '900': 'var(--positive-900)',
                    '950': 'var(--positive-950)'
                },
                ettention: {
                    DEFAULT: 'var(--ettention)',
                    hover: 'var(--ettention-hover)',

                    '50': 'var(--ettention-50)',
                    '100': 'var(--ettention-100)',
                    '200': 'var(--ettention-200)',
                    '300': 'var(--ettention-300)',
                    '400': 'var(--ettention-400)',
                    '500': 'var(--ettention-500)',
                    '600': 'var(--ettention-600)',
                    '700': 'var(--ettention-700)',
                    '800': 'var(--ettention-800)',
                    '900': 'var(--ettention-900)',
                    '950': 'var(--ettention-950)'
                },
                negative: {
                    DEFAULT: 'var(--negative)',
                    hover: 'var(--negative-hover)',

                    '50': 'var(--negative-50)',
                    '100': 'var(--negative-100)',
                    '200': 'var(--negative-200)',
                    '300': 'var(--negative-300)',
                    '400': 'var(--negative-400)',
                    '500': 'var(--negative-500)',
                    '600': 'var(--negative-600)',
                    '700': 'var(--negative-700)',
                    '800': 'var(--negative-800)',
                    '900': 'var(--negative-900)',
                    '950': 'var(--negative-950)'
                },

                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)'
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)'
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)'
                },
                border: 'rgb(var(--border-color)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                chart: {
                    '1': 'var(--chart-1)',
                    '2': 'var(--chart-2)',
                    '3': 'var(--chart-3)',
                    '4': 'var(--chart-4)',
                    '5': 'var(--chart-5)'
                },

                text: {
                    DEFAULT: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                    tertiary: 'var(--text-tertiary)',
                    foreground: 'var(--text-foreground)'
                },

                gray: {
                    DEFAULT: 'var(--gray-400)',
                    '50': 'var(--gray-50)',
                    '100': 'var(--gray-100)',
                    '200': 'var(--gray-200)',
                    '300': 'var(--gray-300)',
                    '400': 'var(--gray-400)',
                    '500': 'var(--gray-500)',
                    '600': 'var(--gray-600)',
                    '700': 'var(--gray-700)',
                    '800': 'var(--gray-800)',
                    '900': 'var(--gray-900)',
                    '950': 'var(--gray-950)'
                },

                // Sidebar
                sidebar: {
                    DEFAULT: 'var(--sidebar-background)',
                    foreground: 'var(--sidebar-foreground)',
                    primary: 'var(--sidebar-primary)',
                    'primary-foreground': 'var(--sidebar-primary-foreground)',
                    accent: 'var(--sidebar-accent)',
                    'accent-foreground': 'var(--sidebar-accent-foreground)',
                    border: 'var(--sidebar-border)',
                    ring: 'var(--sidebar-ring)'
                }
            },
            fontSize: {
                h1: ['var(--h1, 36px)', { lineHeight: '1.2' }],
                h2: ['var(--h2, 32px)', { lineHeight: '1.2' }],
                h3: ['var(--h3, 24px)', { lineHeight: '1.3' }],
                h4: ['var(--h4, 20px)', { lineHeight: '1.3' }],
                h5: ['var(--h5, 18px)', { lineHeight: '1.3' }],

                p: ['var(--p-sm, 14px)', { lineHeight: '1.5' }],
                'p-lg': ['var(--p-lg, 18px)', { lineHeight: '1.5' }],
                'p-md': ['var(--p-md, 16px)', { lineHeight: '1.5' }],
                'p-sm': ['var(--p-sm, 14px)', { lineHeight: '1.5' }],
                'p-xs': ['var(--p-xs, 12px)', { lineHeight: '1.4' }],

                button: ['var(--button-md, 14px)', { lineHeight: '1.4' }],
                'button-lg': ['var(--button-lg, 16px)', { lineHeight: '1.5' }],
                'button-md': ['var(--button-md, 14px)', { lineHeight: '1.4' }],
                'button-sm': ['var(--button-sm, 12px)', { lineHeight: '1.3' }],

                label: ['var(--label-md, 10px)', { lineHeight: '1.2' }],
                'label-lg': ['var(--label-lg, 12px)', { lineHeight: '1.2' }],
                'label-md': ['var(--label-md, 10px)', { lineHeight: '1.2' }],
                'label-sm': ['var(--label-sm, 8px)', { lineHeight: '1.2' }]
            },
            borderRadius: {
                DEFAULT: 'var(--radius-sm, 4px)',
                xs: 'var(--radius-xs, 2px)',
                sm: 'var(--radius-sm, 4px)',
                md: 'var(--radius-md, 6px)',
                lg: 'var(--radius-lg, 8px)',
                xl: 'var(--radius-xl, 12px)',
                '2xl': 'var(--radius-2xl, 16px)',
                '3xl': 'var(--radius-3xl, 20px)',
                '4xl': 'var(--radius-4xl, 24px)'
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(function ({ addUtilities }) {
            const sizes = {
                '4xs': '0.1px',
                '3xs': '0.25px',
                '2xs': '0.5px',
                xs: '0.75px',
                sm: '1px',
                md: '1.5px',
                lg: '2px'
            }

            const opacities = {
                5: '0.05',
                10: '0.1',
                15: '0.15',
                20: '0.2',
                25: '0.25',
                30: '0.3',
                35: '0.35',
                40: '0.4',
                45: '0.45',
                50: '0.5',
                55: '0.55',
                60: '0.6',
                65: '0.65',
                70: '0.7',
                75: '0.75',
                80: '0.8',
                85: '0.85',
                90: '0.9',
                95: '0.95',
                100: '1'
            }

            const utilities: Record<string, any> = {}

            // Генерация классов для всех сторон
            Object.entries(sizes).forEach(([size, value]) => {
                Object.entries(opacities).forEach(([opacity, opacityValue]) => {
                    utilities[`.border-${size}-${opacity}`] = {
                        boxShadow: `inset 0 0 0 ${value} rgba(var(--border-color), ${opacityValue})`
                    }
                })

                // Добавление классов без прозрачности (по умолчанию opacity = 1)
                utilities[`.border-${size}`] = {
                    boxShadow: `inset 0 0 0 ${value} rgba(var(--border-color), 1)`
                }
            })

            // Генерация классов для индивидуальных сторон
            Object.entries(sizes).forEach(([size, value]) => {
                Object.entries(opacities).forEach(([opacity, opacityValue]) => {
                    utilities[`.border-l-${size}-${opacity}`] = {
                        boxShadow: `inset ${value} 0 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-r-${size}-${opacity}`] = {
                        boxShadow: `inset -${value} 0 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-t-${size}-${opacity}`] = {
                        boxShadow: `inset 0 ${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-b-${size}-${opacity}`] = {
                        boxShadow: `inset 0 -${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                })

                // Добавление классов без прозрачности для индивидуальных сторон
                utilities[`.border-l-${size}`] = {
                    boxShadow: `inset ${value} 0 0 0 rgba(var(--border-color), 1)`
                }
                utilities[`.border-r-${size}`] = {
                    boxShadow: `inset -${value} 0 0 0 rgba(var(--border-color), 1)`
                }
                utilities[`.border-t-${size}`] = {
                    boxShadow: `inset 0 ${value} 0 0 rgba(var(--border-color), 1)`
                }
                utilities[`.border-b-${size}`] = {
                    boxShadow: `inset 0 -${value} 0 0 rgba(var(--border-color), 1)`
                }
            })

            // Генерация угловых и направленных классов (x, y, tl, tr, bl, br)
            Object.entries(sizes).forEach(([size, value]) => {
                Object.entries(opacities).forEach(([opacity, opacityValue]) => {
                    utilities[`.border-x-${size}-${opacity}`] = {
                        boxShadow: `inset ${value} 0 0 0 rgba(var(--border-color), ${opacityValue}), inset -${value} 0 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-y-${size}-${opacity}`] = {
                        boxShadow: `inset 0 ${value} 0 0 rgba(var(--border-color), ${opacityValue}), inset 0 -${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-tl-${size}-${opacity}`] = {
                        boxShadow: `inset ${value} 0 0 0 rgba(var(--border-color), ${opacityValue}), inset 0 ${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-tr-${size}-${opacity}`] = {
                        boxShadow: `inset -${value} 0 0 0 rgba(var(--border-color), ${opacityValue}), inset 0 ${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-bl-${size}-${opacity}`] = {
                        boxShadow: `inset ${value} 0 0 0 rgba(var(--border-color), ${opacityValue}), inset 0 -${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                    utilities[`.border-br-${size}-${opacity}`] = {
                        boxShadow: `inset -${value} 0 0 0 rgba(var(--border-color), ${opacityValue}), inset 0 -${value} 0 0 rgba(var(--border-color), ${opacityValue})`
                    }
                })
            })

            // Добавление утилит
            addUtilities(utilities, {
                respectPrefix: true,
                respectImportant: true
            })
        })
    ]
} satisfies Config
