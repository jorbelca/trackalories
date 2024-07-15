module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,

    node: true
  },
  extends: [
    'eslint:recommended'

  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'double'],
    semi: ['error', 'never'],

    'no-console': 0,
    'react/prop-types': 0
  },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
