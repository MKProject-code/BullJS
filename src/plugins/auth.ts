import type {Plugin} from 'graphql-yoga'
import {StatusCodes} from 'http-status-codes'
import {jsonErrorUnauthorized} from '../utils/json.ts'

export function useAuth(): Plugin {
    return {
        onRequest({request, fetchAPI, endResponse}) {
            if (!request.headers.get('authorization')) {
                endResponse(jsonErrorUnauthorized.getResponse(fetchAPI))
            }
        },
    }
}