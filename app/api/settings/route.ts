import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function GET() {
  try {
    // For now, since login is bypassed, just fetch the first user
    const user = await prisma.user.findFirst()
    if (!user) {
      return NextResponse.json({ error: 'No user found' }, { status: 404 })
    }
    return NextResponse.json({ id: user.id, email: user.email, name: user.name })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, name, email, password } = body
    
    if (!id || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dataToUpdate: any = { name, email }

    if (password && password.length >= 6) {
      dataToUpdate.password = await hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate
    })
    
    return NextResponse.json({ success: true, user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name } })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
