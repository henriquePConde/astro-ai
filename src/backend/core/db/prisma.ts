// src/backend/core/db/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const prismaClient = new PrismaClient({
  log: process.env.NODE_ENV !== 'production' ? ['error', 'warn', 'query'] : ['error'],
});

export const prisma: PrismaClient = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
