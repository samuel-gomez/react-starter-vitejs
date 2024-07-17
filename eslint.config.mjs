import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['scripts/*', 'vite.config.ts'],
  },
  ...fixupConfigRules(
    compat.extends(
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier: fixupPluginRules(prettier),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
      'react/jsx-props-no-spreading': 0,
      'react/require-default-props': 'off',
      'react/display-name': 'off',

      'react/jsx-no-useless-fragment': [
        'warn',
        {
          allowExpressions: true,
        },
      ],

      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: true,
        },
      ],

      'no-restricted-exports': 'off',
      'react/function-component-definition': 'off',

      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'enum',
          format: ['PascalCase', 'UPPER_CASE', 'camelCase'],
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/*.steps.ts', '**/*.steps.tsx', 'src/shared/testsUtils/**/*'],

    rules: {
      'import/no-extraneous-dependencies': ['off'],
      'react/display-name': 0,
    },
  },
];
