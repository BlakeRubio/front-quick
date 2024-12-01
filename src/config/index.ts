import { platform } from 'node:os'

export const WIN_PLATFORM = platform() === 'win32'
export const REGISTER = {
  npm: 'https://registry.npmjs.org/',
  taobao: 'https://registry.npmmirror.com/'
}

export { name, version } from '../../package.json'

export const templates = {
  admin: {
    GITEE_URL: '', // gitee模板下载地址
    GITHUB_URL: '', // github模板下载地址
    DESC: 'vue-admin 完整版本', // 模板描述
    BRANCH: 'master' // 分支
  },
}
