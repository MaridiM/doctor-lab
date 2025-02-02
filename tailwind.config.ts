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
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
} satisfies Config
