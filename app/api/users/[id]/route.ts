import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import bcrypt from 'bcryptjs'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'super-admin') {
      return NextResponse.json({ error: 'Unauthorized. Super Admin access required.' }, { status: 403 })
    }

    const { id } = await params
    const data = await request.json()
    const { name, email, password, role } = data

    // If changing email, check if new email already exists
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: { 
          email,
          NOT: { id }
        }
      })

      if (existingUser) {
        return NextResponse.json({ error: 'Email already exists for another user' }, { status: 400 })
      }
    }

    const updateData: any = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || (session.user as any).role !== 'super-admin') {
      return NextResponse.json({ error: 'Unauthorized. Super Admin access required.' }, { status: 403 })
    }

    const { id } = await params

    // Prevent deleting oneself
    if ((session.user as any).id === id) {
      return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 })
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
