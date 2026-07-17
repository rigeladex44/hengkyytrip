import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // We only allow updating the status for now
    if (!body.status) {
      return NextResponse.json({ error: 'Status is required to update' }, { status: 400 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status: body.status }
    })
    
    return NextResponse.json(booking)
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    await prisma.booking.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' })
  } catch (error) {
    console.error("Error deleting booking:", error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
