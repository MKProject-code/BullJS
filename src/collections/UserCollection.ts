import {prisma} from '../app.ts'
import type {user} from '../db/types.ts'

export const UsersCollection = {
    async getOne(where: Partial<user>) {
        return prisma.user.findUnique({
            where: where,
        })
    },
    async getMany(where: Partial<user> = {}) {
        return prisma.user.findMany({
            where: where,
        })
    },
    async add(data: Partial<user>) {
        return prisma.user.create({
            data: data,
        })
    },
}
