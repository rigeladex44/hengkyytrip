'use client'

import { useState } from 'react'
import VehicleTable from '@/components/vehicles/VehicleTable'
import VehicleFormModal from '@/components/vehicles/VehicleFormModal'
import { Plus } from 'lucide-react'

export default function VehiclesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">Fleet Management</h1>
          <p className="text-gray-500 text-sm">Manage all rental vehicles and track their availability status.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gold hover:text-black hover:shadow-lg transition-all group"
        >
          <Plus size={18} className="transition-transform group-hover:rotate-90" />
          <span>Add Vehicle</span>
        </button>
      </div>

      <VehicleTable key={refreshKey} />

      <VehicleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  )
}
