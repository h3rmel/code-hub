import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  jsdoc.configs['flat/recommended-typescript'],
  ...compat.plugins('no-secrets', 'check-file', 'jsx-a11y'),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    ignorePatterns: [
      'node_modules/',
      '.next/',
      'out/',
      'public/',
      'coverage/',
      'dist/',
      'build/',
      'src/components/ui/*.*',
      '/*.*',
    ],
    processor: 'check-file/eslint-processor-check-file',
    rules: {
      /**
       * Default rules
       * @see https://eslint.org/docs/latest/rules/
       */
      // Disable console.log to encourage more explicit logging
      'no-console': [
        'warn',
        {
          allow: [
            'warn',
            'error',
            'info',
            'dir',
            'table',
            'assert',
            'count',
            'time',
            'timeLog',
            'trace',
            'groupCollapsed',
            'groupEnd',
          ],
        },
      ],
      'no-alert': 'error',
      'no-template-curly-in-string': 'error',
      'prefer-template': 'warn',
      'no-implicit-coercion': 'warn',
      'require-await': 'warn',
      'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
      'no-restricted-imports': 'off',
      'padding-line-between-statements': 'off',

      /**
       * JSDoc
       *
       * @see https://github.com/gajus/eslint-plugin-jsdoc
       */
      'jsdoc/require-throws': 'error',
      'jsdoc/check-indentation': 'warn',
      'jsdoc/no-blank-blocks': 'warn',
      'jsdoc/require-asterisk-prefix': 'warn',
      'jsdoc/require-description': 'warn',
      'jsdoc/sort-tags': 'warn',
      'jsdoc/check-syntax': 'warn',
      'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
      'jsdoc/require-param': ['warn', { checkDestructuredRoots: false }],
      // Disable it, as it's not always necessary
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/check-tag-names': ['warn', { definedTags: ['remarks', 'privateRemarks'] }],
      'jsdoc/require-hyphen-before-param-description': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-check': 'off',
      'jsdoc/check-param-names': ['error', { checkDestructured: false }],
      /**
       * Check File
       *
       * @see https://github.com/DukeLuo/eslint-plugin-check-file
       */
      'check-file/no-index': 'off',
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      /**
       * No Secrest rules
       *
       * @see https://github.com/nickdeis/eslint-plugin-no-secrets
       */
      'no-secrets/no-secrets': ['error', { ignoreContent: 'https', tolerance: 4.2 }],
      /**
       * Prettier
       *
       * @see https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file
       */
      'prettier/prettier': 'error',
    },
  }),
];

export default eslintConfig;
