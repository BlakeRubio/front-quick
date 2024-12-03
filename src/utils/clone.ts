import path from 'path'
import fs from 'fs-extra'
import pc from 'picocolors'
import { log, clg } from './log'
import ora, { type Ora } from 'ora'
import createLogger from 'progress-estimator'
import gradientString from 'gradient-string'
import simpleGit, { type SimpleGit, type SimpleGitOptions } from 'simple-git'
import boxen, { Options as boxenOptions } from 'boxen'
import { WIN_PLATFORM } from '../config'
import { cmdOptions, ProjectTemplate } from '../types'
import trash from 'trash'
import { isOverwriteDir } from '../prompt'
import { templates } from '../config'

const spinner: Ora = ora()

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

  const successMessage = gradientString('cyan', 'magenta').multiline('Hello! 欢迎使用 @quick/cli')
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

export const isExistsFile = async (projectName: string, options: cmdOptions) => {
  // 获取当前目录
  const cwd = process.cwd()
  const targetDirectory = path.join(cwd, projectName)
  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      // 将同名项目移到本地回收站中
      await trash([targetDirectory])
      return false
    } else {
      const isOVerwrite = await isOverwriteDir()
      if (!isOVerwrite) {
        clg(pc.green('取消成功'))
        return true
      } else {
        try {
          spinner.start('删除中...')
          await trash([targetDirectory])
          spinner.succeed(`${pc.green('成功删除')} ${pc.gray(projectName)}`)
        } catch (error) {
          spinner.fail(`${pc.red('覆盖失败, 请手动删除重名目录')}`)
          process.exit(1)
        }
        return false
      }
    }
  } else {
    return false
  }
}


export const hasTemplate = (templateName: ProjectTemplate): boolean => {
  const templateKeys = Reflect.ownKeys(templates)
  const hasTemplate = templateKeys.includes(templateName)
  if (!hasTemplate) {
    log.err(`当前模板类型 ${pc.cyan(`${templateName}`)} 不存在 \r\n `)
    log.info(`请输入以下其中一种模板类型: `)
    templateKeys.forEach((key) => {
      clg(
        pc.bold(
          pc.green(`${key as string} `) + pc.gray(`${templates[key as ProjectTemplate].DESC}`)
        )
      )
    })
  }
  return hasTemplate
}
