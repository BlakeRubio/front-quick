import pc from 'picocolors'
import { log, clg } from './log'
import createLogger from 'progress-estimator'
import gradientString from 'gradient-string'
import simpleGit, { type SimpleGit, type SimpleGitOptions } from 'simple-git'
import boxen, { Options as boxenOptions } from 'boxen'
import { WIN_PLATFORM } from '../config'


const logger = createLogger(
  WIN_PLATFORM
    ? {}
    : {
        spinner: {
          interval: 140,
          frames: ['🚶 ', '🏃 ']
        }
      }
)

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
}

export const clone = async (
  repo: string,
  projectName: string,
  options: string[]
): Promise<void> => {
  const git: SimpleGit = simpleGit(gitOptions)
  try {
    console.log('下载中')
    const gitCloneFunction = git.clone(repo, projectName, options)
    await logger(gitCloneFunction, '下载耗时: ', {
      estimate: 7000
    })
  } catch (err) {
    console.log('下载错误')
    console.log(err)
    process.exit(1)
  }

  const successMessage = gradientString('cyan', 'magenta').multiline(
    'Hello! 欢迎使用 @quick/cli'
  )
  const boxenOprions: boxenOptions = {
    padding: 1,
    margin: 1,
    borderColor: 'cyan',
    borderStyle: 'round'
  }
  clg(boxen(successMessage, boxenOprions))

  // 使用提示
  clg(` cd ${pc.cyan(projectName)}`)
  clg(' pnpm install')
  clg(' pnpm dev')
}
