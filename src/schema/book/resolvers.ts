import {BookRepository} from '../../repository/BookRepository.ts'
import type {GraphQLContext} from '../../server/context.ts'

export const resolvers = {
    Query: {
        async book(parent: unknown, args: {
            id: string
        }, context: GraphQLContext, info: any) {
            const fields: any = {}
            info.fieldNodes[0].selectionSet.selections.forEach((field: any) => {
                fields[field.name.value] = true
            });
            
            fields.author = {
                select: {
                    id: true
                }
            }
            console.log(fields)
            
            const book = await BookRepository.getOne(context, args, fields)
            console.log(book)
            return book
        },
        async books(parent: unknown, args: {}, context: GraphQLContext) {
            return BookRepository.getMany(context)
        },
    },
    Mutation: {
    },
}