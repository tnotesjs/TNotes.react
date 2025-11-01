/**
 * eslint.config.mjs
 * 这是通过上述流程生成的默认的 eslint 的配置文件内容
 */
import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

/* @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
]
