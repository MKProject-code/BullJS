import {runBun} from './server/bun.ts'

interface IConfig {
    env: string
    port: number
}

export function initApp(config: IConfig) {
    const server = runBun(config.port)
}

