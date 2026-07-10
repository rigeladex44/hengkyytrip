'use client'

import { useState, useEffect } from 'react'
import { MoreHorizontal, Edit, Trash2, Check, X, Search, Calendar, Phone } from 'lucide-react'

// Define the type based on our Prisma schema
type Booking = {
  id: string
  customerName: string
  customerPhone: string
  type: string
  status: string
  startDate: string
  endDate: string
  totalAmount: number
  createdAt: string
  tourPackage?: { title: string }
  vehicle?: { brand: string, model: string }
}

export default function BookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL') // ALL, PENDING, PAID, CANCELLED

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/bookings')
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (error) {
      console.error("Failed to fetch bookings", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status } : b))
      }
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBookings(bookings.filter(b => b.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete booking", error)
    }
  }

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                          b.customerPhone.includes(search)
    const matchesFilter = filter === 'ALL' || b.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PAID':
        return <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">Paid</span>
      case 'PENDING':
        return <span className="px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full border border-amber-200">Pending</span>
      case 'CANCELLED':
        return <span className="px-3 py-1 text-xs font-medium bg-rose-100 text-rose-700 rounded-full border border-rose-200">Cancelled</span>
      case 'COMPLETED':
        return <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">Completed</span>
      default:
        return <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">{status}</span>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-gray-50 p-1 rounded-xl w-fit border border-gray-200/60">
          {['ALL', 'PENDING', 'PAID', 'CANCELLED'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${filter === f ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customer..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Type & Details</th>
              <th className="px-6 py-4 font-semibold">Dates</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading bookings...</span>
                  </div>
                </td>
              </tr>
            ) : filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <Calendar className="h-8 w-8 text-gray-300" />
                    <span className="text-sm">No bookings found</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{booking.customerName}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Phone size={10} /> {booking.customerPhone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold tracking-wider text-gold uppercase mb-1">{booking.type.replace('_', ' ')}</span>
                      <span className="text-sm text-gray-600 truncate max-w-[150px]">
                        {booking.type === 'TOUR' && booking.tourPackage?.title}
                        {booking.type === 'CAR_RENTAL' && booking.vehicle && `${booking.vehicle.brand} ${booking.vehicle.model}`}
                        {!booking.tourPackage && !booking.vehicle && "Custom"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm text-gray-600">
                      <span>{formatDate(booking.startDate)}</span>
                      <span className="text-xs text-gray-400">to {formatDate(booking.endDate)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{formatCurrency(booking.totalAmount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {booking.status === 'PENDING' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'PAID')}
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Mark as Paid"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {booking.status !== 'CANCELLED' && (
                        <button 
                          onClick={() => updateStatus(booking.id, 'CANCELLED')}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                          title="Cancel Booking"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteBooking(booking.id)}
                        className="p-1.5 bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
