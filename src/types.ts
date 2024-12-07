export interface cmdOptions {
    '--': string[]
    f: boolean
    g: boolean
    force: boolean
    github: boolean
  }

export type ProjectTemplate = 'admin' | 'H5' | 'minProgram'
export type NpmRegisterOrigin = 'taobao' | 'npm' | 'cnpm'