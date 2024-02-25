import {makeBehavior} from 'graphql-ws/lib/use/uWebSockets'
import {buildSchema} from 'graphql/utilities'

// yarn add uWebSockets.js@uNetworking/uWebSockets.js#<tag>
import uWS from 'uWebSockets.js'

const schema = buildSchema(`
    type Query {
        hello: String
        user(id: ID!): User
    }

    type User {
        id: ID!
        name: String
        email: String
    }
`)

const roots = {
    query: {
        hello: () => {
            return 'Hello, world!'
        },
    },
}

export default function startWebsocketServer(port: number) {
    const graphqlEndpoint = '/graphql'
    uWS
    .App()
    .ws('/graphql', makeBehavior({schema, roots}))
    .get('/playground', (res, req) => {
        // Wysyłanie HTML z interfejsem GraphQL Playground
        res.end(`
        <html>
            <head>
                <title>GraphQL Playground</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/graphql-playground-react/1.7.27/graphql-playground.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/graphql-playground-react/1.7.27/graphql-playground.min.js"></script>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    GraphQLPlayground.init(document.getElementById('root'), {
                        endpoint: '${graphqlEndpoint}'
                    })
                </script>
            </body>
        </html>
    `)
    })
    .listen(port, listenSocket => {
        if (listenSocket !== false) {
            console.log(`Listening to port ${port}`)
        } else {
            console.log('Error...')
        }
    })
}