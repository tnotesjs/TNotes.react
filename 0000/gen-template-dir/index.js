import fs from 'fs'
import path from 'path'

const START_NUM = 46
const END_NUM = 100
const TEMPLATE = `# xxx

<!-- region:toc -->
<!-- endregion:toc -->

##

`

const __dirname = path.dirname(new URL(import.meta.url).pathname)

for (let id = START_NUM; id <= END_NUM; id++) {
  const dirName = `${id.toString().padStart(4, '0')}. xxx`
  fs.mkdirSync(path.resolve(__dirname, dirName))
  fs.writeFileSync(path.resolve(__dirname, dirName, 'README.md'), TEMPLATE)
}
