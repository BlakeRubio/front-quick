import inquirer from 'inquirer'

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
          name: 'vue3'
        }
      ]
    }
  ])
  return template
}

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
