import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

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

    // Seed Tour Packages
    const packagesPath = path.join(process.cwd(), 'public', 'data', 'packages.json')
    const packagesData = JSON.parse(fs.readFileSync(packagesPath, 'utf8'))
    
    for (const pkg of packagesData) {
      if (pkg.id !== 'p4') { // Skip p4 as it's car rental
        await prisma.tourPackage.upsert({
          where: { id: pkg.id },
          update: {},
          create: {
            id: pkg.id,
            title: pkg.name,
            description: pkg.description,
            price: parseFloat(pkg.price) || 0,
            duration: parseInt(pkg.duration) || 1,
            location: 'East Java / Bali',
            imageUrl: pkg.image
          }
        })
      }
    }
    
    return NextResponse.json({ message: 'Database seeded successfully!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
