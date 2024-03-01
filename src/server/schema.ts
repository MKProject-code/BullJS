import {loadFilesSync} from '@graphql-tools/load-files'
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge'
import {createSchema, type YogaSchemaDefinition} from 'graphql-yoga'
import {join} from 'path'

const typeDefsArray = loadFilesSync(join(__dirname, './../schema/**/*.{graphql,gql}'))
const resolversArray = loadFilesSync(join(__dirname, './../schema/**/*.{js,ts}'))
const typeDefs = mergeTypeDefs(typeDefsArray)
const resolvers = mergeResolvers(resolversArray)

export const schema: YogaSchemaDefinition<any, any> = createSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
})