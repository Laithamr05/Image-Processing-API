module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier'
  ],
  rules: {
    'import/order': ['warn', { 'newlines-between': 'always' }]
  },
  ignorePatterns: ['dist', 'node_modules']
};
