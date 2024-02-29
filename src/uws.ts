import {execute, ExecutionArgs, subscribe} from 'graphql'
import {makeBehavior} from 'graphql-ws/lib/use/uWebSockets'
import {createSchema, createYoga, Repeater} from 'graphql-yoga'
import {App, HttpRequest, HttpResponse} from 'uWebSockets.js'

interface ServerContext {
    req: HttpRequest
    res: HttpResponse
}

// const yoga = createYoga<ServerContext>({
//     schema,
//     graphiql: {
//         subscriptionsProtocol: 'WS', // use WebSockets instead of SSE
//     },
// })

const yoga = createYoga<ServerContext>({
    schema: createSchema({
        typeDefs: /* GraphQL */ `
            type Query {
                hello: String!
            }

            type Subscription {
                time: String!
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!',
            },
            Subscription: {
                time: {
                    subscribe: () =>
                     new Repeater((push, stop) => {
                         const interval = setInterval(() => {
                             push({
                                 time: new Date().toISOString(),
                             })
                         }, 1000)
                         stop.then(() => clearInterval(interval))
                     }),
                },
            },
        },
    }),
    graphiql: {
        subscriptionsProtocol: 'WS', // use WebSockets instead of SSE
    },
})

type EnvelopedExecutionArgs = ExecutionArgs & {
    rootValue: {
        execute: typeof execute
        subscribe: typeof subscribe
    }
}


const wsHandler = makeBehavior({
    execute: (args: EnvelopedExecutionArgs) => args.rootValue.execute(args),
    subscribe: (args: EnvelopedExecutionArgs) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
        const {schema, execute, subscribe, contextFactory, parse, validate} = yoga.getEnveloped(ctx)
        
        const args: EnvelopedExecutionArgs = {
            schema,
            operationName: msg.payload.operationName,
            document: parse(msg.payload.query),
            variableValues: msg.payload.variables,
            contextValue: await contextFactory(),
            rootValue: {
                execute,
                subscribe,
            },
        }
        
        const errors = validate(args.schema, args.document)
        if (errors.length > 0) {
            return errors
        }
        return args
    },
})

export const app = App().any('/*', yoga).ws(yoga.graphqlEndpoint, wsHandler)