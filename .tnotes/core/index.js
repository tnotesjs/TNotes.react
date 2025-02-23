import path from 'path'
import minimist from 'minimist'

import { repoName, ignore_dirs } from '../config/.tnotes.json'

import ReadmeUpdater from './updateREADME.js'
import { mergeReadme, distributeReadme } from './notes-merge-distribute.js'
import { syncRepo } from './utils'
import { __dirname, ROOT_DIR } from './constants.js'
import fs from 'fs'

const notesmeta = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.notesmeta.json'), 'utf-8')
)

;(async () => {
  const args = minimist(process.argv)

  if (args.updateREADME || args.update) {
    const updater = new ReadmeUpdater()
    updater.updateReadme()
    await syncRepo(ROOT_DIR)
  }

  if (args.syncREADME || args.sync) {
    await syncRepo(ROOT_DIR)
  }

  if (args.mergeREADME || args.merge) {
    mergeReadme(ROOT_DIR, ignore_dirs)
  }

  if (args.distributeREADME || args.distribute) {
    distributeReadme(ROOT_DIR)
  }
})()
