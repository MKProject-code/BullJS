import type {YogaInitialContext} from 'graphql-yoga'
import { PrismaClient, type User } from '@prisma/client'
import { authenticateUser } from '../security/auth.ts'

const prisma = new PrismaClient()

export type GraphQLContext = {
    prisma: PrismaClient
    currentUser: null | User
} & YogaInitialContext

export async function createContext(initialContext: YogaInitialContext): Promise<GraphQLContext> {
    return {
        prisma,
        currentUser: await authenticateUser(prisma, initialContext.request)
    }
}