module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:fsd/all',
  ],
  plugins: [
    'fsd',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    $: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'warn',
    'import/no-unresolved': 'off',
    'import/no-named-as-default-member': 'warn',
    'import/no-named-as-default': 'warn',
    'no-underscore-dangle': [
      'error',
      {
        'allowAfterThis': true,
        'allowAfterSuper': true
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling"],
        ],
        'newlines-between': "always",
        alphabetize: {order: 'asc', caseInsensitive: true}
      }
    ],
  },
};
