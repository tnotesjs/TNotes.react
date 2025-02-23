import { fileURLToPath } from 'url'
import path from 'path'
import { repoName } from '../config/.tnotes.json'

export const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const ROOT_DIR = path.resolve(__dirname, '..', '..')
export const ROOT_PKG_PATH = path.resolve(__dirname, '..', '..', 'package.json')

export const EOL = '\n'
export const MERGED_README_FILENAME = 'MERGED_README.md'
export const SEPERATOR = `<!-- !======> SEPERATOR <====== -->`

/**
 * 新增笔记 README.md 模板
 */
export const NEW_NOTES_README_MD_TEMPLATE = `# xxx

<!-- region:toc -->
<!-- endregion:toc -->

##

`

/**
 * 新增笔记 .tnotes.json 模板
 */
export const NEW_NOTES_TNOTES_JSON_TEMPLATE = `{
  "bilibili": [],
  "done": false
}`

/**
 * 创建根目录下的 package.json 包体描述文件时的默认模板
 */
export const ROOT_PKG_TEMPLATE = `{
  "scripts": {
    "docs:dev": "        vitepress dev",
    "docs:build": "      vitepress build",
    "docs:preview": "    vitepress preview",
    "distribute": "      node ./node_modules/tnotes   --distributeREADME    --repoName=${repoName}",
    "docs:publish": "    node ./node_modules/tnotes/scripts/docs-publish.js",
    "merge": "           node ./node_modules/tnotes   --mergeREADME         --repoName=${repoName}",
    "sync": "            node ./node_modules/tnotes   --syncREADME          --repoName=${repoName}",
    "test": "            echo \"Error: no test specified\" && exit 1",
    "update": "          node ./node_modules/tnotes   --updateREADME        --repoName=${repoName}"
  },
  "dependencies": {
    "github-slugger": "^2.0.0",
    "markdown-it-container": "^4.0.0",
    "markdown-it-link-attributes": "^4.0.1",
    "minimist": "^1.2.8",
    "swiper": "^11.2.1"
  },
  "devDependencies": {
    "markdown-it-task-lists": "^2.1.1",
    "vitepress": "^1.6.3"
  },
}`
