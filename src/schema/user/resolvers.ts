import {UserRepository} from '../../repository/UserRepository.ts'
import type {GraphQLContext} from '../../server/context.ts'

export const resolvers = {
    Query: {
        async user(parent: unknown, args: {
            id: string
        }, context: GraphQLContext) {
            return UserRepository.getOne(context, args)
        },
        async users(parent: unknown, args: {}, context: GraphQLContext) {
            return UserRepository.getMany(context)
        },
    },
    Mutation: {
        async createUser(
         parent: unknown,
         args: {
             name: string
         },
         context: GraphQLContext,
        ) {
            if (context.currentUser === null) {
                throw new Error('Unauthenticated!')
            }
            
            return await UserRepository.add(context, args)
        },
    },
}