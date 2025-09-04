// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', '*.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended, // убрали typeChecked для мягкости
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Отключаем строгие правила
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/prefer-const': 'warn',
      
      // Общие правила
      'no-console': 'warn', // разрешаем console.log
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'warn',
      
      // Prettier конфликты
      'prettier/prettier': ['warn', {
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
        trailingComma: 'es5',
      }],
    },
  },
);