module.exports = {
  '*.{ts,tsx,scss,css,json,md}': 'prettier --write src',
  '*.{ts,tsx}': 'eslint ./src --fix',
};
