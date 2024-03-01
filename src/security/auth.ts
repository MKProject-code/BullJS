import {type JwtPayload, verify } from 'jsonwebtoken'
import type {PrismaClient, user} from '@prisma/client'

export const APP_SECRET = 'this is my secret'

export async function authenticateUser(
 prisma: PrismaClient,
 request: Request
): Promise<user | null> {
    const header = request.headers.get('authorization')
    if (header !== null) {
        const token = header.split(' ')[1]
        const tokenPayload = verify(token, APP_SECRET) as JwtPayload
        const userId = tokenPayload.userId
        return prisma.user.findUnique({where: {id: userId}})
    }
    
    return null
}