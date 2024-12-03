import { platform } from 'node:os'

export const WIN_PLATFORM = platform() === 'win32'
export const REGISTER = {
  npm: 'https://registry.npmjs.org/',
  taobao: 'https://registry.npmmirror.com/'
}

export { name, version } from '../../package.json'

export const templates = {
  // 后台管理系统
  admin: {
    GITEE_URL: '', // gitee模板下载地址
    GITHUB_URL: '', // github模板下载地址
    DESC: 'quick-admin 后台版本', // 模板描述
    BRANCH: 'master' // 分支
  },
  // H5
  h5: {
    GITEE_URL: '', // gitee模板下载地址
    GITHUB_URL: '', // github模板下载地址
    DESC: 'quick-h5 H5 版本', // 模板描述
    BRANCH: 'master' // 分支
  },
  // mini-program
  minProgram: {
    GITEE_URL: '', // gitee模板下载地址
    GITHUB_URL: '', // github模板下载地址
    DESC: 'quick-minProgram 小程序版本', // 模板描述
    BRANCH: 'master' // 分支
  }
}
