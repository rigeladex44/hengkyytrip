import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tours = await prisma.tourPackage.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tours)
  } catch (error) {
    console.error("Error fetching tours:", error)
    return NextResponse.json({ error: 'Failed to fetch tours' }, { status: 500 })
  }
}

import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const duration = formData.get('duration') as string
    const location = formData.get('location') as string
    const image = formData.get('image') as File | null
    
    // Validate required fields
    if (!title || !description || !price || !duration || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let imageUrl = null

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer())
      const filename = `${Date.now()}-${image.name.replace(/\\s+/g, '-')}`
      const publicDir = path.join(process.cwd(), 'public', 'uploads')
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true })
      }
      
      fs.writeFileSync(path.join(publicDir, filename), buffer)
      imageUrl = `/uploads/${filename}`
    }

    const tour = await prisma.tourPackage.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        duration: parseInt(duration, 10),
        location,
        imageUrl,
      }
    })
    
    return NextResponse.json(tour, { status: 201 })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 })
  }
}
