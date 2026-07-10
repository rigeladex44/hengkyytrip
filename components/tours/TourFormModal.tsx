'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type TourFormModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function TourFormModal({ isOpen, onClose, onSuccess }: TourFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    imageUrl: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        onSuccess()
        onClose()
        setFormData({ title: '', description: '', price: '', duration: '', location: '', imageUrl: '' })
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create tour package')
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
          <h2 className="text-lg font-bold text-black">Add Tour Package</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="tour-form" onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Package Title *</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. 3 Days Explorer Bali"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase">Description *</label>
              <textarea 
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detail about the tour..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Price (IDR) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Duration (Days) *</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={formData.duration}
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Location *</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Bali, Indonesia"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">Image URL</label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
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
            form="tour-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-gold hover:text-black rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Package'}
          </button>
        </div>
      </div>
    </div>
  )
}
