import {createSchema, type YogaSchemaDefinition} from 'graphql-yoga'
import {UsersCollection} from './collections/UserCollection.ts'

export const schema: YogaSchemaDefinition<any, any> = createSchema({
    typeDefs: /* GraphQL */ `
        schema {
            query: Query
            mutation: Mutation
        }

        type Query {
            user(id: ID!): User
            users: [User!]
        }

        #####################
        
        enum UserRole {
            OWNER
            MEMBER
        }

        type User {
            id: ID!
            firstName: String!
            lastName: String
            role: UserRole
        }
        type Mutation {
            addUser(firstName: String!): User
        }
    `,
    resolvers: {
        Query: {
            user(_: any, {id}: any) {
                return UsersCollection.getOne({
                    id,
                })
            },
            users() {
                return UsersCollection.getMany()
            },
        },
        Mutation: {
            addUser(_: any, {firstName}: any) {
                return UsersCollection.add({
                    firstName
                })
            },
        },
    },
})