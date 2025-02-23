/**
 * 作用：同步本地仓库和远程仓库
 */
import { syncLocalAndRemote } from './utils.js';
import path from 'path';
import { __dirname } from './constants.js';

(async () => {
    await syncLocalAndRemote(path.join(__dirname, '..'));
})();
