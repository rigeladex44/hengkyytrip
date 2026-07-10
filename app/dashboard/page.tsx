"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, CarFront, CalendarCheck, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl text-black font-bold tracking-tight"
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 mt-1"
          >
            Welcome back, Admin. Here's what's happening today.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <span className="text-sm text-gray-400 font-medium">Last synced: Just now</span>
          <button className="bg-white border border-gray-200 hover:border-black text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            Refresh Data
          </button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="Rp 12.5M" 
          trend="+15%" 
          isPositive={true} 
          icon={<TrendingUp className="text-gold" size={24} />} 
          delay={0.1}
        />
        <StatCard 
          title="Active Bookings" 
          value="24" 
          trend="+4%" 
          isPositive={true} 
          icon={<CalendarCheck className="text-black" size={24} />} 
          delay={0.2}
        />
        <StatCard 
          title="Vehicles Rented" 
          value="8 / 15" 
          trend="Stable" 
          isPositive={true} 
          icon={<CarFront className="text-gray-600" size={24} />} 
          delay={0.3}
        />
        <StatCard 
          title="Total Clients" 
          value="142" 
          trend="+12" 
          isPositive={true} 
          icon={<Users className="text-gold" size={24} />} 
          delay={0.4}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold tracking-tight text-black">Recent Bookings</h2>
            <button className="text-sm font-medium text-gold hover:text-black transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gold/30 hover:bg-white transition-all group shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-black text-gold flex items-center justify-center shadow-inner">
                    <CarFront size={20} />
                  </div>
                  <div>
                    <h3 className="text-black font-semibold group-hover:text-gold transition-colors">Avanza Veloz 2023</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Rented by: Bpk. Budi Santoso</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 mb-1">
                    Active
                  </span>
                  <p className="text-xs text-gray-400 font-medium">Ends in 2 days</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions & Notifications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-black rounded-2xl p-6 relative overflow-hidden shadow-lg border border-gray-800">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl"></div>
            <h2 className="text-lg font-bold tracking-tight text-white mb-4 relative z-10">Quick Actions</h2>
            <div className="space-y-3 relative z-10">
              <button className="w-full bg-gold text-black p-3 rounded-xl hover:bg-gold-light transition-colors text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                <span>+ New Booking</span>
              </button>
              <button className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-xl hover:bg-gray-800 hover:border-gray-600 transition-colors text-sm font-medium">
                Add Vehicle
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight text-black mb-4">Upcoming Tours</h2>
            <div className="space-y-5">
              <div className="pl-4 border-l-2 border-gold relative">
                <div className="absolute w-2 h-2 bg-gold rounded-full -left-[5px] top-1.5 shadow-[0_0_8px_rgba(197,160,89,0.8)]"></div>
                <h3 className="text-sm font-bold text-black">Bali 3D2N Explorer</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Tomorrow, 08:00 AM • 12 Guests</p>
              </div>
              <div className="pl-4 border-l-2 border-black relative">
                <div className="absolute w-2 h-2 bg-black rounded-full -left-[5px] top-1.5"></div>
                <h3 className="text-sm font-bold text-black">Bromo Sunrise</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Oct 15, 02:00 AM • 4 Guests</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, isPositive, icon, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gold/50 hover:shadow-lg transition-all group relative overflow-hidden"
    >
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
        {icon}
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-black shadow-sm group-hover:bg-gold/5 transition-colors">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{trend}</span>
        </div>
      </div>
      <div className="relative z-10">
        <h3 className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider text-[10px]">{title}</h3>
        <p className="text-3xl text-black font-bold tracking-tight">{value}</p>
      </div>
    </motion.div>
  )
}
