import { PrismaClient } from '@prisma/client'
import path from 'path'

const prismaClientSingleton = () => {
  const dbPath = path.join(process.cwd(), 'dev.db')
  process.env.DATABASE_URL = `file:${dbPath}`
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
