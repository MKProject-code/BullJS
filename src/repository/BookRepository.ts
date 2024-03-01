import type {Prisma} from '@prisma/client'
import type {GraphQLContext} from '../server/context.ts'

export const BookRepository = {
    async getOne(context: GraphQLContext, where: Prisma.BookWhereInput, select?: Prisma.BookSelect) {
        return context.prisma.book.findFirst({
            select: select,
            where: where
        })
    },
    async getMany(context: GraphQLContext, where: Prisma.BookWhereInput = {}) {
        return context.prisma.book.findMany({
            where: where,
        })
    },
    async add(context: GraphQLContext, data: Prisma.XOR<Prisma.BookCreateInput, Prisma.BookUncheckedCreateInput>) {
        return context.prisma.book.create({
            data: data,
        })
    },
}
