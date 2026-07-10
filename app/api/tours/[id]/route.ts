import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    // For now we just support updating the image or basic fields if needed
    const tour = await prisma.tourPackage.update({
      where: { id },
      data: body
    })
    
    return NextResponse.json(tour)
  } catch (error) {
    console.error("Error updating tour:", error)
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 })
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
      where: { tourPackageId: id }
    })

    if (relatedBookings > 0) {
      return NextResponse.json({ error: 'Cannot delete tour package because it has active bookings' }, { status: 400 })
    }

    await prisma.tourPackage.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true, message: 'Tour deleted successfully' })
  } catch (error) {
    console.error("Error deleting tour:", error)
    return NextResponse.json({ error: 'Failed to delete tour' }, { status: 500 })
  }
}
