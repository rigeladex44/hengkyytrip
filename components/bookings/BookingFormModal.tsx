'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type BookingFormModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function BookingFormModal({ isOpen, onClose, onSuccess }: BookingFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    type: 'TOUR',
    startDate: '',
    endDate: '',
    totalAmount: '',
    notes: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        onSuccess()
        onClose()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error(error)
      alert('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Add New Booking</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Customer Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.customerPhone}
                  onChange={e => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={formData.customerEmail}
                  onChange={e => setFormData({...formData, customerEmail: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Booking Type *</label>
                <select 
                  required
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                >
                  <option value="TOUR">Tour Package</option>
                  <option value="CAR_RENTAL">Car Rental</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Start Date *</label>
                <input 
                  type="date" 
                  required
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">End Date *</label>
                <input 
                  type="date" 
                  required
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Total Amount (IDR) *</label>
              <input 
                type="number" 
                required
                min="0"
                value={formData.totalAmount}
                onChange={e => setFormData({...formData, totalAmount: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Additional Notes</label>
              <textarea 
                rows={3}
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 mt-auto">
          <button 
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-200 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="booking-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-gold hover:text-black rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
