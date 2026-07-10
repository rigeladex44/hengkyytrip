import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Total Revenue (PAID or COMPLETED bookings)
    const paidBookings = await prisma.booking.findMany({
      where: {
        status: { in: ['PAID', 'COMPLETED'] }
      },
      orderBy: { createdAt: 'desc' }
    })

    const totalRevenue = paidBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)
    const totalCompleted = paidBookings.length

    // Pending Revenue (PENDING bookings)
    const pendingBookings = await prisma.booking.findMany({
      where: { status: 'PENDING' }
    })
    const pendingRevenue = pendingBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

    // Recent Transactions (Limit 10 paid bookings)
    const recentTransactions = paidBookings.slice(0, 10)

    return NextResponse.json({
      totalRevenue,
      pendingRevenue,
      totalCompleted,
      recentTransactions
    })
  } catch (error) {
    console.error("Error calculating finance data:", error)
    return NextResponse.json({ error: 'Failed to fetch finance data' }, { status: 500 })
  }
}
