module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 'off',
    'react/display-name': 'off',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }],
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
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', '**/*.steps.ts', '**/*.steps.tsx', 'src/shared/testsUtils/**/*'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
        'react/display-name': 0,
      },
    },
  ],
};
