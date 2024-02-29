// import 'source-map-support/register'
import {initApp} from './src/app'

// Ignore the first two elements from process.argv, which contain the path to Node.js and the script name
const args = process.argv.slice(2)

function getParamValueInt(paramNames: string[], def: number) {
    return parseInt(getParamValue(paramNames, def.toString()))
}

function getParamValue(
 paramNames: string[], def: string,
): string {
    const element = args.find((item: string) => {
        for (const paramName of paramNames) {
            if (
             item.startsWith(paramName + '=')
            ) {
                return true
            }
        }
    })
    return (element !== undefined)
     ? element.substring(element.indexOf('=') + 1)
     : def
}

// Get the value of the --port or -p parameter
const port: number | null = getParamValueInt(['port', 'p'], 4000)
const env: string | null = getParamValue(['env', 'e'], 'dev').toLowerCase()
initApp({
    env,
    port,
})