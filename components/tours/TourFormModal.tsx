'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

type TourFormModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  tourToEdit?: any
}

export default function TourFormModal({ isOpen, onClose, onSuccess, tourToEdit }: TourFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    location: '',
    imageUrl: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  import_react: {
    const { useEffect } = require('react')
    useEffect(() => {
      if (tourToEdit) {
        setFormData({
          title: tourToEdit.title || '',
          description: tourToEdit.description || '',
          price: tourToEdit.price?.toString() || '',
          duration: tourToEdit.duration?.toString() || '',
          location: tourToEdit.location || '',
          imageUrl: tourToEdit.imageUrl || ''
        })
      } else {
        setFormData({ title: '', description: '', price: '', duration: '', location: '', imageUrl: '' })
      }
      setImageFile(null)
    }, [tourToEdit, isOpen])
  }

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isEditing = !!tourToEdit
      const url = isEditing ? `/api/tours/${tourToEdit.id}` : '/api/tours'
      const method = isEditing ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        body: (() => {
          const fd = new FormData()
          fd.append('title', formData.title)
          fd.append('description', formData.description)
          fd.append('price', formData.price)
          fd.append('duration', formData.duration)
          fd.append('location', formData.location)
          if (imageFile) {
            fd.append('image', imageFile)
          }
          return fd
        })()
      })

      if (res.ok) {
        onSuccess()
        onClose()
        setFormData({ title: '', description: '', price: '', duration: '', location: '', imageUrl: '' })
        setImageFile(null)
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
          <h2 className="text-lg font-bold text-black">{tourToEdit ? 'Edit Tour Package' : 'Add Tour Package'}</h2>
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
                <label className="text-xs font-semibold text-gray-500 uppercase">Package Image</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0])
                      }
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-500 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-black hover:file:bg-gray-300"
                  />
                  {formData.imageUrl && !imageFile && (
                    <img src={formData.imageUrl} alt="Current" className="w-10 h-10 rounded-md object-cover border border-gray-200" />
                  )}
                </div>
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
