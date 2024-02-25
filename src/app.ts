import startWebsocketServer from './websocket'

interface IConfig {
    env: string
    port: number
}

export function initApp(config: IConfig) {
    startWebsocketServer(config.port)
}