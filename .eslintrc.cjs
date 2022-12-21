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
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
    'react/jsx-one-expression-per-line': ['off', { allow: 'none' }],
    'no-restricted-exports': 'off',
    'implicit-arrow-linebreak': 0,
  },
};
