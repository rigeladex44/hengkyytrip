'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type VehicleFormModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function VehicleFormModal({ isOpen, onClose, onSuccess }: VehicleFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    plateNumber: '',
    pricePerDay: '',
    status: 'AVAILABLE'
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        onSuccess()
        onClose()
        setFormData({ brand: '', model: '', year: '', plateNumber: '', pricePerDay: '', status: 'AVAILABLE' })
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to add vehicle')
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
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-black">Add New Vehicle</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="vehicle-form" onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Brand *</label>
                <input 
                  type="text" 
                  required
                  value={formData.brand}
                  onChange={e => setFormData({...formData, brand: e.target.value})}
                  placeholder="e.g. Toyota"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Model *</label>
                <input 
                  type="text" 
                  required
                  value={formData.model}
                  onChange={e => setFormData({...formData, model: e.target.value})}
                  placeholder="e.g. Alphard"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Year *</label>
                <input 
                  type="number" 
                  required
                  min="2000"
                  max="2100"
                  value={formData.year}
                  onChange={e => setFormData({...formData, year: e.target.value})}
                  placeholder="e.g. 2023"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Plate Number *</label>
                <input 
                  type="text" 
                  required
                  value={formData.plateNumber}
                  onChange={e => setFormData({...formData, plateNumber: e.target.value})}
                  placeholder="e.g. DK 1234 AB"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black uppercase focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Price Per Day (IDR) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={formData.pricePerDay}
                  onChange={e => setFormData({...formData, pricePerDay: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Initial Status *</label>
                <select 
                  required
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="RENTED">Rented</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
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
            form="vehicle-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-gold hover:text-black rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Vehicle'}
          </button>
        </div>
      </div>
    </div>
  )
}
