import type { Config } from 'tailwindcss'

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
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
                    foreground: 'var(--primary-foreground)',
                    hover: 'var(--primary-hover)',
                    disabled: 'var(--primary-disabled)',
                    '5': 'var(--primary-5)',
                    '10': 'var(--primary-10)',
                    '15': 'var(--primary-15)',
                    '20': 'var(--primary-20)',
                    '25': 'var(--primary-25)',
                    '30': 'var(--primary-30)',
                    '35': 'var(--primary-35)',
                    '40': 'var(--primary-40)',
                    '45': 'var(--primary-45)',
                    '50': 'var(--primary-50)',
                    '55': 'var(--primary-55)',
                    '60': 'var(--primary-60)',
                    '65': 'var(--primary-65)',
                    '70': 'var(--primary-70)',
                    '75': 'var(--primary-75)',
                    '80': 'var(--primary-80)',
                    '85': 'var(--primary-85)',
                    '90': 'var(--primary-90)',
                    '95': 'var(--primary-95)',
                    '100': 'var(--primary-100)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                    hover: 'var(--secondary-hover)'
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
                    foreground: 'var(--destructive-foreground)',
                    hover: 'var(--destructive-hover)',
                    disabled: 'var(--destructive-disabled)'
                },
                border: 'var(--border)',
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
                    tertiary: 'var(--text-tertiary)'
                }
            },
            fontSize: {
                h1: ['var(--h1, 36px)', { lineHeight: '1.2' }],
                h2: ['var(--h2, 32px)', { lineHeight: '1.2' }],
                h3: ['var(--h3, 24px)', { lineHeight: '1.3' }],
                h4: ['var(--h4, 20px)', { lineHeight: '1.3' }],
                h5: ['var(--h5, 18px)', { lineHeight: '1.3' }],

                'p-lg': ['var(--p-lg, 18px)', { lineHeight: '1.5' }],
                'p-md': ['var(--p-md, 16px)', { lineHeight: '1.5' }],
                'p-sm': ['var(--p-sm, 14px)', { lineHeight: '1.5' }],
                'p-xs': ['var(--p-xs, 12px)', { lineHeight: '1.4' }],

                'button-lg': ['var(--button-lg, 16px)', { lineHeight: '1.5' }],
                'button-md': ['var(--button-md, 14px)', { lineHeight: '1.4' }],
                'button-sm': ['var(--button-sm, 12px)', { lineHeight: '1.3' }],

                'label-lg': ['var(--label-lg, 12px)', { lineHeight: '1.2' }],
                'label-md': ['var(--label-md, 10px)', { lineHeight: '1.2' }],
                'label-sm': ['var(--label-sm, 8px)', { lineHeight: '1.2' }]
            },

            borderRadius: {
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
    plugins: [require('tailwindcss-animate')]
} satisfies Config
