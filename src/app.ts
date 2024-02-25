import {app} from './uws'

interface IConfig {
    env: string
    port: number
}

export function initApp(config: IConfig) {
    // startWebsocketServer(config.port)
   
    app.listen(config.port, (listenSocket) => {
        if(listenSocket !== false) {
            console.log(`Server is running on http://localhost:${config.port}`)
        } else {
            console.log('Error: Server running problem.')
        }
    })
}