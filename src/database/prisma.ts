import { PrismaClient } from "@prisma/client";

// Cria a instância do PrismaClient e configura para mostrar as queries no terminal
export const prisma = new PrismaClient({
    log: ['query']
});