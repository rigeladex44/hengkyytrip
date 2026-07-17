'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Shield, X, Mail, User, Lock, AlertCircle } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin'
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setIsLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to fetch users')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '', password: '', role: 'admin' })
    setIsModalOpen(true)
  }

  const openEditModal = (user: any) => {
    setEditingUser(user)
    setFormData({ name: user.name || '', email: user.email, password: '', role: user.role })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id))
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to delete user')
      }
    } catch (err) {
      alert('An error occurred while deleting')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const url = editingUser ? `/api/users/${editingUser.id}` : '/api/users'
    const method = editingUser ? 'PATCH' : 'POST'
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setIsModalOpen(false)
        fetchUsers()
      } else {
        const err = await res.json()
        alert(err.error || 'Operation failed')
      }
    } catch (err) {
      alert('An error occurred')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle size={20} />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-black">Active Administrators</h2>
        <button 
          onClick={openAddModal}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gold hover:text-black hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative group overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${user.role === 'super-admin' ? 'bg-gold' : 'bg-black'}`}></div>
            
            <div className="flex justify-between items-start mb-4 pl-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black font-bold">
                  {user.name ? user.name.substring(0, 2).toUpperCase() : 'AU'}
                </div>
                <div>
                  <h3 className="font-bold text-black">{user.name || 'Unknown'}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${user.role === 'super-admin' ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-600'}`}>
                {user.role}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-6 pl-3 border-t border-gray-50 pt-4">
              <button 
                onClick={() => openEditModal(user)}
                className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-gray-600 hover:text-black bg-gray-50 hover:bg-gray-100 py-2 rounded-lg transition-colors"
              >
                <Edit2 size={14} /> Edit
              </button>
              <button 
                onClick={() => handleDelete(user.id)}
                className="flex-1 flex items-center justify-center gap-2 text-xs font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-500 py-2 rounded-lg transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-black">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                  <p className="text-sm text-gray-500">{editingUser ? 'Update administrator details' : 'Create a new admin account'}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
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
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                    <Lock size={14} /> {editingUser ? 'New Password (Optional)' : 'Password'}
                  </label>
                  <input 
                    type="password" 
                    required={!editingUser}
                    minLength={6}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    placeholder={editingUser ? "Leave blank to keep current" : ""}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5">
                    <Shield size={14} /> Role
                  </label>
                  <select 
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all appearance-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="super-admin">Super Admin</option>
                  </select>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-black text-white rounded-xl font-medium hover:bg-gold hover:text-black transition-all shadow-md hover:shadow-lg"
                  >
                    {editingUser ? 'Save Changes' : 'Create User'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
