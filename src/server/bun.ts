import {EnvelopArmor} from '@escape.tech/graphql-armor'
import {createYoga} from 'graphql-yoga'
import {createContext} from './context.ts'
import {useAuth} from '../plugins/auth.ts'
import {schema} from './schema.ts'
import { createFetch } from '@whatwg-node/fetch'

const armor = new EnvelopArmor();
const protection = armor.protect()

const signingKey: string = process.env.JWT_SECRET!

const yoga = createYoga({
    schema: schema,
    multipart: false, // Upload multiple files
    fetchAPI: createFetch({ // Upload files limits
        formDataLimits: {
            // Maximum allowed file size (in bytes)
            fileSize: 1000000,
            // Maximum allowed number of files
            files: 10,
            // Maximum allowed size of content (operations, variables etc...)
            fieldSize: 1000000,
            // Maximum allowed header size for form data
            headerSize: 1000000
        }
    }),
    // context: (req) => ({ // Context factory gets called for every request
    //     myToken: req.request.headers.get('authorization'),
    // }),
    landingPage: false, // Home page
    graphiql: true, // Web interface
    maskedErrors: false,
    context: createContext,
    plugins: [
     
     //FOR PRODUCTION
     //    useDisableIntrospection({
     //        isDisabled: request => request.headers.get('x-allow-introspection') !== 'secret-access-key'
     //    }),
     //    blockFieldSuggestionsPlugin(),
     ////////////////////////////////
     
        useAuth(),
        // useJWT({
        //     issuer: 'http://graphql-yoga.com',
        //     signingKey
        // }),
        // useExtendContext(async ctx => {
        //     console.log('jwt:', ctx.jwt);
        // }),
        // useSofa({
        //     basePath: '/rest',
        //     swaggerUI: {
        //         endpoint: '/swagger'
        //     },
        // title: 'Example API',
        // version: '1.0.0'
        // })
        // ...protection.plugins
    ],
})

export function runBun(port: number) {
    const server = Bun.serve({
        development: false,
        port: port,
        fetch: yoga,
    })
    console.info(
     `Server is running on ${new URL(
      yoga.graphqlEndpoint,
      `http://${server.hostname}:${server.port}`,
     )}`,
    )
    return server
}
