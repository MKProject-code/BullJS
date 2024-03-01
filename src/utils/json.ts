import type {FetchAPI} from 'graphql-yoga'
import {getReasonPhrase, StatusCodes} from 'http-status-codes'

export const jsonErrorUnauthorized = {
    body: (messages: string[] = [getReasonPhrase(StatusCodes.UNAUTHORIZED)]): string =>
     JSON.stringify({
         errors: messages.map(msg => {
             return {
                 message: msg,
             }
         }),
     }),
    header: (headers: {[p: string]: string} = {}): {status: number, headers: {[p: string]: string}} => ({
        status: StatusCodes.UNAUTHORIZED,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    }),
    getResponse(provider: FetchAPI, options: {messages?: string[], headers?: {[p: string]: string}} = {}) {
        return new provider.Response(jsonErrorUnauthorized.body(options.messages), jsonErrorUnauthorized.header(options.headers))
    },
}