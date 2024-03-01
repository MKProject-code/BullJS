import type {Prisma} from '@prisma/client'
import type {GraphQLContext} from '../server/context.ts'

export const UserRepository = {
    async getOne(context: GraphQLContext, where: Prisma.UserWhereInput) {
        return context.prisma.user.findFirst({
            where: where
        })
    },
    async getMany(context: GraphQLContext, where: Prisma.UserWhereInput = {}) {
        return context.prisma.user.findMany({
            where: where,
        })
    },
    async add(context: GraphQLContext, data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>) {
        return context.prisma.user.create({
            data: data,
        })
    },
}
