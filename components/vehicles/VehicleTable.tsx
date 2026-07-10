'use client'

import { useState, useEffect } from 'react'
import { Car, Search, Wrench, Trash2, CheckCircle2 } from 'lucide-react'

type Vehicle = {
  id: string
  plateNumber: string
  brand: string
  model: string
  year: number
  status: string
  pricePerDay: number
}

export default function VehicleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('ALL') // ALL, AVAILABLE, RENTED, MAINTENANCE

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/vehicles')
      if (res.ok) {
        const data = await res.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error("Failed to fetch vehicles", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setVehicles(vehicles.map(v => v.id === id ? { ...v, status } : v))
      }
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const deleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return
    
    try {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id))
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete vehicle')
      }
    } catch (error) {
      console.error("Failed to delete vehicle", error)
    }
  }

  const filteredVehicles = vehicles.filter(v => {
    const searchString = `${v.brand} ${v.model} ${v.plateNumber}`.toLowerCase()
    const matchesSearch = searchString.includes(search.toLowerCase())
    const matchesFilter = filter === 'ALL' || v.status === filter
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'AVAILABLE':
        return <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">Available</span>
      case 'RENTED':
        return <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">Rented</span>
      case 'MAINTENANCE':
        return <span className="px-3 py-1 text-xs font-medium bg-rose-100 text-rose-700 rounded-full border border-rose-200">Maintenance</span>
      default:
        return <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">{status}</span>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount) + '/day'
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-gray-50 p-1 rounded-xl w-fit border border-gray-200/60">
          {['ALL', 'AVAILABLE', 'RENTED', 'MAINTENANCE'].map((f) => (
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
            placeholder="Search by brand, model or plate..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Vehicle</th>
              <th className="px-6 py-4 font-semibold">Plate Number</th>
              <th className="px-6 py-4 font-semibold">Price / Day</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">Loading fleet...</span>
                  </div>
                </td>
              </tr>
            ) : filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <Car className="h-8 w-8 text-gray-300" />
                    <span className="text-sm">No vehicles found</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</span>
                      <span className="text-xs text-gray-500">{vehicle.year}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-block bg-gray-100 border border-gray-200 px-3 py-1 rounded text-sm font-bold tracking-widest text-black">
                      {vehicle.plateNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{formatCurrency(vehicle.pricePerDay)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(vehicle.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {vehicle.status !== 'AVAILABLE' && (
                        <button 
                          onClick={() => updateStatus(vehicle.id, 'AVAILABLE')}
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          title="Set Available"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                      {vehicle.status !== 'MAINTENANCE' && (
                        <button 
                          onClick={() => updateStatus(vehicle.id, 'MAINTENANCE')}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                          title="Set to Maintenance"
                        >
                          <Wrench size={16} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteVehicle(vehicle.id)}
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
