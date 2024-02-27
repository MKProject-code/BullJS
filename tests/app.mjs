import assert from "assert";
import ws from "ws";
import {randomUUID} from "node:crypto";
import {createClient} from "graphql-ws";

describe('GraphQL WebSocket Client', function () {
    it('should connect to the server and receive data', function (done) {

        const client = createClient({
            url: 'ws://localhost:4000/graphql',
            webSocketImpl: ws,
            generateID: () => randomUUID(),
        });
        // const client = createClient({
        //     url: 'ws://localhost:4000/graphql',
        //     webSocketImpl: WebSocket,
        // });


        (async () => {
            const query = client.iterate({
                query: '{ hello }',
            });

            try {
                const { value } = await query.next();
                // next = value = { data: { hello: 'Hello World!' } }
                // complete
            } catch (err) {
                // error
            }
        })();
    }).timeout(5000); // Zwiększ limit czasu na wykonanie testu do 5000ms
});
