import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        tourPackage: true,
        vehicle: true,
      }
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.customerName || !body.customerPhone || !body.type || !body.startDate || !body.endDate || !body.totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerEmail: body.customerEmail || null,
        type: body.type,
        status: body.status || 'PENDING',
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        totalAmount: parseFloat(body.totalAmount),
        notes: body.notes || null,
        tourPackageId: body.tourPackageId || null,
        vehicleId: body.vehicleId || null,
      }
    })
    
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
