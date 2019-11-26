module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-one-expression-per-line': 0, // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    'react/jsx-wrap-multilines': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline', // 关闭airbnb对函数调用参数，非一行，最后也要加逗号的限制
      },
    ],
    'jsx-a11y/no-static-element-interactions': 'off', // 关闭非交互元素加事件必须加 role
    'jsx-a11y/click-events-have-key-events': 'off', // 关闭残障人士友好交互
    'no-use-before-define': 0,
    'no-param-reassign': 1,
    'consistent-return': 0,
    'no-case-declarations': 0,
    'react/destructuring-assignment': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: true },
    ],
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          '@',
          'api',
          'utils',
          'pages',
          'styles',
          'components',
          'types',
          'store',
        ],
      },
    ],
    'object-curly-newline': 0,
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'import/prefer-default-export': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.native.js'],
      },
    },
  },
};
