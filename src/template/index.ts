import { chooseTemplate } from '../prompt'
import { checkNpmVersion, clone, clg } from '../utils'
import { templates, version, name as npmName } from '../config'
import type { ProjectTemplate } from '../types'

export const create = async (
  projectName: string,
  templateName?: ProjectTemplate,
  isDownloadForGithub = false
) => {
  const handleRun = async (name: ProjectTemplate) => {
    const { GITEE_URL, GITHUB_URL, BRANCH } = templates[name]
    const downloadSource = isDownloadForGithub ? GITHUB_URL : GITEE_URL
    // 并行执行
    Promise.all([
      clone(downloadSource, projectName, ['-b', `${BRANCH}`]),
      checkNpmVersion(version, npmName)
    ]).then((res) => {
      res[1] && clg(res[1])
    })
  }
  if (templateName) {
    handleRun(templateName)
  } else {
    const template = await chooseTemplate()
    handleRun(template)
  }
}
