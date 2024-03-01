import {hash} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import {UserRepository} from '../../repository/UserRepository.ts'
import {APP_SECRET} from '../../security/auth.ts'
import type {GraphQLContext} from '../../server/context.ts'

export const resolvers = {
    Query: {
        async me(parent: unknown, args: {}, context: GraphQLContext) {
            if (context.currentUser === null) {
                throw new Error('Unauthenticated!')
            }
            
            return context.currentUser
        },
    },
    Mutation: {
        async signup(
         parent: unknown,
         args: {
             email: string;
             password: string;
             name: string
         },
         context: GraphQLContext,
        ) {
            const password = await hash(args.password, 10)
            const user = await UserRepository.add(context, {...args, password})
            const token = sign({userId: user.id}, APP_SECRET)
            return {token, user}
        },
    },
}