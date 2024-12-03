import { cac } from 'cac'
import figlet from 'figlet'
import { inputProjectName, chooseDownloadOrigin } from './prompt'
import { create } from './template'
import { version, templates } from './config'
import { ProjectTemplate } from './types'
import { hasTemplate, checkOptions, log, clg, isExistsFile } from './utils'

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
    const isExists = await isExistsFile(projectName, cmd)
    if (isExists) return
    const isDownloadForGithub = await chooseDownloadOrigin()
    create(projectName, undefined, isDownloadForGithub)
  })

// 增强创建指令
cli
  .command('init <template-name> <project-name>', '创建一个新的项目')
  .option('-f, --force', '如果目标文件存在，则强制覆盖')
  // 指定项目从 github 下载
  .option('-g --github', '使用github模板地址')
  .action(async (templateName, projectName, cmd) => {
    if (!hasTemplate(templateName)) return
    const isExists = await isExistsFile(projectName, cmd)
    if (isExists) return
    create(projectName, templateName)
  })

// 查看所有模板
cli.command('list', '查看所有模板').action(async () => {
  Object.keys(templates).forEach((key: string) => {
    clg(`${key} ${templates[key as ProjectTemplate].DESC}`)
  })
})

// 查看脚手架帮助
cli.help(() => {
  clg(
    '\r\n' +
      figlet.textSync('quick', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
  )
})

// 无效命令
cli.on('command:*', () => {
  log.err(`无效的命令: ${cli.args.join(' ')}`)
  cli.outputHelp()
  // 退出
  process.exit(1)
})

// 检查无效选项 当命令错误时输出帮助信息
checkOptions(cli)

cli.parse()
