import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@hengkyytrip.com' },
      update: {},
      create: {
        email: 'admin@hengkyytrip.com',
        name: 'Admin Utama',
        password: hashedPassword,
        role: 'admin',
      },
    })
    
    return NextResponse.json({ message: 'Admin user seeded successfully!', user: { email: admin.email, role: admin.role } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to seed admin user' }, { status: 500 })
  }
}
