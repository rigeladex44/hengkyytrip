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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.description || !body.price || !body.duration || !body.location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const tour = await prisma.tourPackage.create({
      data: {
        title: body.title,
        description: body.description,
        price: parseFloat(body.price),
        duration: parseInt(body.duration, 10),
        location: body.location,
        imageUrl: body.imageUrl || null,
      }
    })
    
    return NextResponse.json(tour, { status: 201 })
  } catch (error) {
    console.error("Error creating tour:", error)
    return NextResponse.json({ error: 'Failed to create tour' }, { status: 500 })
  }
}
