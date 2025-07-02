import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    '@rocketseat/eslint-config/next',
    'next/core-web-vitals',
    'next/typescript',
  ),
  ...compat.plugins('simple-import-sort'),
  ...compat.config({
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  }),
  {
    ignores: ['node_modules', '.next', 'dist'],
  },
]

export default eslintConfig
