import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import cypressPlugin from 'eslint-plugin-cypress';

export default defineConfig([
  
  globalIgnores(['dist', 'node_modules']),

  
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  
  {
    files: ['cypress/e2e/**/*.js'],
    extends: [
      cypressPlugin.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
  },

  
  {
    files: ['cypress.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off', 
    },
  },
]);