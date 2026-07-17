'use client'

import { useState } from 'react'
import TourCardGrid from '@/components/tours/TourCardGrid'
import TourFormModal from '@/components/tours/TourFormModal'
import { Plus } from 'lucide-react'

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [editingTour, setEditingTour] = useState<any>(null)

  const handleEdit = (tour: any) => {
    setEditingTour(tour)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setTimeout(() => setEditingTour(null), 300)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">Tour Packages</h1>
          <p className="text-gray-500 text-sm">Manage tour packages, pricing, and locations.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gold hover:text-black hover:shadow-lg transition-all group"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          <span>Add Package</span>
        </button>
      </div>

      <TourCardGrid key={refreshKey} onEdit={handleEdit} />

      <TourFormModal 
        isOpen={isModalOpen} 
        onClose={handleClose} 
        onSuccess={() => setRefreshKey(prev => prev + 1)}
        tourToEdit={editingTour}
      />
    </div>
  )
}
