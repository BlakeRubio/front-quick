import { cac } from 'cac'
import { inputProjectName, chooseDownloadOrigin } from './prompt'
import { create } from './template'
import { version, templates } from './config'
// import { isExistsFile } from './has-file'
import { ProjectTemplate } from './types'
import { clg } from './utils'

const cli = cac('quick')

// 查看脚手架版本
cli.version(version)

cli
  // 项目创建命令
  .command('create', '创建一个新的项目')
  .option('-f, --force', '如果目标文件存在，则强制覆盖')
  // 指定项目从 github 下载
  .option('-g --github', '使用github模板地址')
  .action(async (cmd) => {
    const projectName = await inputProjectName()
    const isDownloadForGithub = await chooseDownloadOrigin()
    create(projectName, undefined, isDownloadForGithub)
  })

// 查看所有模板
cli.command('list', '查看所有模板').action(async () => {
  Object.keys(templates).forEach((key: string) => {
    clg(`${key} ${templates[key as ProjectTemplate].DESC}`)
  })
})

cli.parse()
