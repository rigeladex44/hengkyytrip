import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

import fs from 'fs'
import path from 'path'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if body is FormData or JSON
    const contentType = request.headers.get('content-type') || ''
    
    let dataToUpdate: any = {}
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const price = formData.get('price') as string
      const duration = formData.get('duration') as string
      const location = formData.get('location') as string
      const image = formData.get('image') as File | null
      
      if (title) dataToUpdate.title = title
      if (description) dataToUpdate.description = description
      if (price) dataToUpdate.price = parseFloat(price)
      if (duration) dataToUpdate.duration = parseInt(duration, 10)
      if (location) dataToUpdate.location = location
      
      if (image) {
        const buffer = Buffer.from(await image.arrayBuffer())
        const filename = `${Date.now()}-${image.name.replace(/\\s+/g, '-')}`
        const publicDir = path.join(process.cwd(), 'public', 'uploads')
        
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true })
        }
        
        fs.writeFileSync(path.join(publicDir, filename), buffer)
        dataToUpdate.imageUrl = `/uploads/${filename}`
      }
    } else {
      dataToUpdate = await request.json()
    }

    const tour = await prisma.tourPackage.update({
      where: { id },
      data: dataToUpdate
    })
    
    return NextResponse.json(tour)
  } catch (error) {
    console.error("Error updating tour:", error)
    return NextResponse.json({ error: 'Failed to update tour' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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
