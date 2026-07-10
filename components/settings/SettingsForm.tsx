'use client'

import { useState, useEffect } from 'react'
import { Save, User, Lock, Mail } from 'lucide-react'

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        setFormData({ ...data, password: '' })
      }
    } catch (error) {
      console.error("Failed to fetch settings", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ text: '', type: '' })

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' })
        setFormData(prev => ({ ...prev, password: '' })) // Clear password field
      } else {
        const error = await res.json()
        setMessage({ text: error.error || 'Failed to update profile', type: 'error' })
      }
    } catch (error) {
      console.error(error)
      setMessage({ text: 'An unexpected error occurred.', type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 w-full bg-gray-50 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-50 rounded-xl"></div>
          <div className="h-12 w-full bg-gray-50 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl relative overflow-hidden">
      
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-black"></div>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-1">Admin Profile</h2>
        <p className="text-sm text-gray-500">Update your login credentials and personal details here.</p>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
            <User size={14} /> Full Name
          </label>
          <input 
            type="text" 
            required
            value={formData.name || ''}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
            <Mail size={14} /> Email Address
          </label>
          <input 
            type="email" 
            required
            value={formData.email || ''}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
            <Lock size={14} /> New Password
          </label>
          <input 
            type="password" 
            placeholder="Leave blank to keep current password"
            minLength={6}
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
          />
          <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters long if you decide to change it.</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
        <button 
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gold hover:text-black hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  )
}
