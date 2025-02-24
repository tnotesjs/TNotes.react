import minimist from 'minimist'

import ReadmeUpdater from './updateREADME.js'
import { mergeReadme, distributeReadme } from './notes-merge-distribute.js'
import { syncRepo, getTnotesConfig } from './utils/index.js'
import { __dirname, ROOT_DIR } from './constants.js'

const { ignore_dirs } = getTnotesConfig();

;(async () => {
  const args = minimist(process.argv)

  if (args.update) {
    const updater = new ReadmeUpdater()
    updater.updateReadme()
    await syncRepo()
  }

  if (args.sync) await syncRepo()
  if (args.merge) mergeReadme(ROOT_DIR, ignore_dirs)
  if (args.distribute) distributeReadme(ROOT_DIR)
})()
