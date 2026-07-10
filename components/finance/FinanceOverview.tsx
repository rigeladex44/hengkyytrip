'use client'

import { useState, useEffect } from 'react'
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, TrendingUp } from 'lucide-react'

type Transaction = {
  id: string
  customerName: string
  type: string
  totalAmount: number
  status: string
  createdAt: string
}

type FinanceData = {
  totalRevenue: number
  pendingRevenue: number
  totalCompleted: number
  recentTransactions: Transaction[]
}

export default function FinanceOverview() {
  const [data, setData] = useState<FinanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFinanceData()
  }, [])

  const fetchFinanceData = async () => {
    try {
      const res = await fetch('/api/finance')
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch (error) {
      console.error("Failed to fetch finance data", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString))
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-32 bg-white rounded-2xl border border-gray-100 shadow-sm"></div>)}
        </div>
        <div className="h-96 bg-white rounded-2xl border border-gray-100 shadow-sm"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-black to-gray-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gold/20 rounded-full blur-2xl group-hover:bg-gold/30 transition-all duration-500"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">Total Revenue</p>
              <h3 className="text-3xl font-bold text-white">{formatCurrency(data.totalRevenue)}</h3>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <TrendingUp className="text-gold" size={24} />
            </div>
          </div>
          <div className="flex items-center text-emerald-400 text-xs font-medium relative z-10">
            <ArrowUpRight size={14} className="mr-1" />
            <span>Based on paid bookings</span>
          </div>
        </div>

        {/* Pending Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Pending Payments</p>
              <h3 className="text-3xl font-bold text-black">{formatCurrency(data.pendingRevenue)}</h3>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
              <Clock className="text-amber-500" size={24} />
            </div>
          </div>
          <div className="flex items-center text-amber-500 text-xs font-medium">
            <ArrowDownRight size={14} className="mr-1" />
            <span>Awaiting customer payments</span>
          </div>
        </div>

        {/* Completed Bookings */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Successful Bookings</p>
              <h3 className="text-3xl font-bold text-black">{data.totalCompleted}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
              <CheckCircle2 className="text-emerald-500" size={24} />
            </div>
          </div>
          <div className="flex items-center text-emerald-500 text-xs font-medium">
            <ArrowUpRight size={14} className="mr-1" />
            <span>Fully paid transactions</span>
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-black">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No recent transactions found.
                  </td>
                </tr>
              ) : (
                data.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">
                      {tx.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{tx.customerName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold tracking-wider text-gold uppercase px-2 py-1 bg-gold/10 rounded-md">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-emerald-600">+{formatCurrency(tx.totalAmount)}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
