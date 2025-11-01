/**
 * eslint.config.mjs
 */
import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 假如我们现在要加上约束：不能使用双引号，只能使用单引号。
      // 可以对默认的文件内容做以下修改：
      // 添加 quotes 规则，确保只使用单引号
      quotes: ['error', 'single'],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
]
