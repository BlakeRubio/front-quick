import { cac } from 'cac'
import { inputProjectName, chooseDownloadOrigin } from './prompt'
import { create } from './template'
// import { isExistsFile } from './has-file'

const cli = cac('quick')
cli.version(`1.0.0`)

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

cli.parse()
