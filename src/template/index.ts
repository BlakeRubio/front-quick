import { chooseTemplate } from '../prompt'
import type { ProjectTemplate } from '../types'
import { clone } from '../utils'
import { templates } from '../config'

export const create = async (
  projectName: string,
  templateName?: ProjectTemplate,
  isDownloadForGithub = false
) => {
  const handleRun = async (name: ProjectTemplate) => {
    const { GITEE_URL, GITHUB_URL, BRANCH } = templates[name]
    const downloadSource = isDownloadForGithub ? GITHUB_URL : GITEE_URL

    // 下载模板
    clone(downloadSource, projectName, ['-b', `${BRANCH}`])
  }
  if (templateName) {
    handleRun(templateName)
  } else {
    const template = await chooseTemplate()
    handleRun(template)
  }
}
