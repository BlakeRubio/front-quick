import type { CAC } from "cac"
import log from "./log"

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