import inquirer from 'inquirer'

// 获取项目名称
export const inputProjectName = async () => {
  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      default: 'my-project'
    }
  ])
  return projectName
}

export const chooseDownloadOrigin = async () => {
  const { chooseDownloadOrigin } = await inquirer.prompt([
    {
      type: 'list',
      name: 'chooseDownloadOrigin',
      message: '请选择一个代码托管平台下载模板',
      choices: [
        {
          name: 'GitHub',
          value: 'true'
        },
        {
          name: 'Gitee',
          value: 'false'
        }
      ]
    }
  ])
  return chooseDownloadOrigin
}

export const chooseTemplate = async () => {
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: '选择一个项目模板',
      choices: [
        {
          name: 'admin'
        },
        {
          name: 'H5'
        },
        {
          name: 'mini-program'
        }
      ]
    }
  ])
  return template
}

export const isOverwriteDir = async () => {
  const { isOverwrite } = await inquirer.prompt([
    // 返回值为promise
    {
      name: 'isOverwrite', // 与返回值对应
      type: 'list', // list 类型
      message: '目标文件已存在, 请选择一个操作',
      choices: [
        { name: '覆盖(会将同名项目移到本地回收站中)', value: true },
        { name: '取消', value: false }
      ]
    }
  ])
  return isOverwrite
}