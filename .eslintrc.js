module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['plugin:react/recommended', 'eslint:recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'react/prop-types': 0,
        'no-undef': 0,
        'no-unused-vars': 0
    }
}
