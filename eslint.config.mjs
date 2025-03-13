import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

const eslintConfig = [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
        plugins: ['i18next'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'off',

            'i18next/no-literal-string': [
                'error',
                {
                    ignore: ['/^className$/', 'data-testid', 'id'],
                    ignoreAttribute: ['to', 'href']
                }
            ]
        }
    }),
    i18next
]

export default eslintConfig
