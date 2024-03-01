import {runBun} from './bun.ts'

import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

interface IConfig {
    env: string
    port: number
}

export function initApp(config: IConfig) {
    const server = runBun(config.port)
}

//