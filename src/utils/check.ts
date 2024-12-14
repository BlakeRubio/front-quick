import boxen from 'boxen'
import pc from 'picocolors'
import semver from 'semver'
import { REGISTER, WIN_PLATFORM } from '../config'
import axios, { type AxiosResponse } from 'axios'
import log from './log'
import type { CAC } from 'cac'
import type { NpmRegisterOrigin } from '../types'

export const checkOptions = (cli: CAC) => {
  const argv = process.argv.filter((argv) => argv.startsWith('-'))
  // 有效的选项
  const availableOptions = ['-f', '-g', '-v', '-h', '--force', '--github', '--version', '--help']
  /** 无效的选项 */
  const invalidOptions = argv.find((argv) => !availableOptions.includes(argv))
  if (!invalidOptions) return
  log.err(`无效的选项: ${invalidOptions}`)
  cli.outputHelp()
  process.exit(1)
}

// 获取镜像源
export const getDefaultRegister = (registerOrigin: NpmRegisterOrigin = 'taobao') => {
  return REGISTER[registerOrigin]
}

export const getNpmInfo = async (npmName: string, register = getDefaultRegister()) => {
  const npmUrl = register + npmName
  let res
  try {
    res = await axios.get(npmUrl)
  } catch (err) {
    log.warning(`未发现${npmName}包，请检查是否发布到${register}`)
    process.exit(1)
  }
  return res
}

export const getNpmLatestVersion = async (npmName: string, register = getDefaultRegister()) => {
  const { data } = (await getNpmInfo(npmName, register)) as AxiosResponse
  return data['dist-tags'].latest
}

export const isShowEmoji = (emoji: string) => {
  return WIN_PLATFORM ? '' : emoji
}

// 检查 npm 版本
export const checkNpmVersion = async (currentVersion: string, npmName: string) => {
  const latestVersion = await getNpmLatestVersion(npmName)
  if (semver.lt(latestVersion, currentVersion) || latestVersion === currentVersion) return
  const dim = pc.dim
  const magenta = pc.magenta
  return boxen(
    `${isShowEmoji('🎉')} ${pc.yellow('哇~有更新!')} ${pc.red(currentVersion)} → ${pc.green(
      latestVersion
    )}\n${isShowEmoji('🚀')} ${
      dim('请运行') + magenta(` npm i -g ${npmName}@latest `) + dim('升级到最新版')
    }`,
    { padding: 1, margin: 1, borderColor: 'cyan', borderStyle: 'round' }
  )
}
