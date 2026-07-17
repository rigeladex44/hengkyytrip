'use client'

import { useState, useEffect } from 'react'
import { MapPin, Clock, Edit, Trash2, Image as ImageIcon } from 'lucide-react'

type TourPackage = {
  id: string
  title: string
  description: string
  price: number
  duration: number
  location: string
  imageUrl: string | null
}

export default function TourCardGrid({ onEdit }: { onEdit?: (tour: TourPackage) => void }) {
  const [tours, setTours] = useState<TourPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/tours')
      if (res.ok) {
        const data = await res.json()
        setTours(data)
      }
    } catch (error) {
      console.error("Failed to fetch tours", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTour = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour package?')) return
    
    try {
      const res = await fetch(`/api/tours/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setTours(tours.filter(t => t.id !== id))
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete tour package')
      }
    } catch (error) {
      console.error("Failed to delete tour", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(n => (
          <div key={n} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-80 animate-pulse flex flex-col">
            <div className="h-40 bg-gray-200"></div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 border-dashed p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-300">
          <MapPin size={32} />
        </div>
        <h3 className="text-lg font-bold text-black mb-1">No Tour Packages</h3>
        <p className="text-gray-500 text-sm max-w-sm">You haven't created any tour packages yet. Click the "Add Package" button to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tours.map(tour => (
        <div key={tour.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
          {/* Image Area */}
          <div className="h-48 relative overflow-hidden bg-gray-100">
            {tour.imageUrl ? (
              <img 
                src={tour.imageUrl} 
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 group-hover:scale-105 transition-transform duration-500">
                <ImageIcon size={32} />
                <span className="text-xs font-medium mt-2">No Image provided</span>
              </div>
            )}
            
            {/* Price Badge Over Image */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm font-bold text-sm text-black border border-white/50">
              {formatCurrency(tour.price)}
            </div>

            {/* Hover Action Buttons */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <button 
                onClick={() => onEdit && onEdit(tour)}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gold hover:text-black hover:scale-110 transition-all shadow-lg" 
                title="Edit Package"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => deleteTour(tour.id)}
                className="w-10 h-10 bg-white text-rose-600 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white hover:scale-110 transition-all shadow-lg" 
                title="Delete Package"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-bold text-lg text-black mb-2 line-clamp-1 group-hover:text-gold transition-colors">{tour.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
              {tour.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Clock size={14} className="text-gold" />
                <span>{tour.duration} Days</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <MapPin size={14} className="text-gold" />
                <span className="truncate max-w-[100px]">{tour.location}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
