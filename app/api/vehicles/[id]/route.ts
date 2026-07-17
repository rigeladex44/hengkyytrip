import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: body
    })
    
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error("Error updating vehicle:", error)
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    // Check if it has active bookings before deleting
    const relatedBookings = await prisma.booking.count({
      where: { vehicleId: id }
    })

    if (relatedBookings > 0) {
      return NextResponse.json({ error: 'Cannot delete vehicle because it is tied to active bookings' }, { status: 400 })
    }

    await prisma.vehicle.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' })
  } catch (error) {
    console.error("Error deleting vehicle:", error)
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 })
  }
}
