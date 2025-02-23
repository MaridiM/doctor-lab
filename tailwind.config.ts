import type { Config } from 'tailwindcss'

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
                h1: ['var(--h1, 36px)', { lineHeight: '48px' }],
                h2: ['var(--h2, 32px)', { lineHeight: '40px' }],
                h3: ['var(--h3, 24px)', { lineHeight: '32px' }],
                h4: ['var(--h4, 20px)', { lineHeight: '24px' }],
                h5: ['var(--h5, 18px)', { lineHeight: '24px' }],

                p: ['var(--p-sm, 14px)', { lineHeight: '20px' }],
                'p-lg': ['var(--p-lg, 18px)', { lineHeight: '24px' }],
                'p-md': ['var(--p-md, 16px)', { lineHeight: '24px' }],
                'p-sm': ['var(--p-sm, 14px)', { lineHeight: '20px' }],
                'p-xs': ['var(--p-xs, 12px)', { lineHeight: '16px' }],

                button: ['var(--button-md, 14px)', { lineHeight: '20' }],
                'button-lg': ['var(--button-lg, 16px)', { lineHeight: '24px' }],
                'button-md': ['var(--button-md, 14px)', { lineHeight: '20px' }],
                'button-sm': ['var(--button-sm, 12px)', { lineHeight: '16px' }],

                label: ['var(--label-md, 10px)', { lineHeight: '12px' }],
                'label-lg': ['var(--label-lg, 12px)', { lineHeight: '14px' }],
                'label-md': ['var(--label-md, 10px)', { lineHeight: '12px' }],
                'label-sm': ['var(--label-sm, 8px)', { lineHeight: '10px' }]
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

    corePlugins: {
        // Отключаем дефолтные утилиты для бордера:
        borderWidth: false,
        borderColor: false,
        // borderStyle: false
    },

    plugins: [require('tailwindcss-animate')]
} satisfies Config
