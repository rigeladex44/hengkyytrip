import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.plateNumber || !body.brand || !body.model || !body.year || !body.pricePerDay) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Ensure plate number is unique
    const existingVehicle = await prisma.vehicle.findUnique({
      where: { plateNumber: body.plateNumber }
    })

    if (existingVehicle) {
      return NextResponse.json({ error: 'Vehicle with this plate number already exists' }, { status: 400 })
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        plateNumber: body.plateNumber.toUpperCase(),
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year, 10),
        status: body.status || 'AVAILABLE',
        pricePerDay: parseFloat(body.pricePerDay),
      }
    })
    
    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error("Error creating vehicle:", error)
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 })
  }
}
