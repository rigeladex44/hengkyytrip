'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  CalendarDays, 
  Car, 
  Wallet, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Map
} from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col hidden md:flex z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-md group-hover:shadow-gold/20 transition-all border border-gray-800">
              <span className="text-gold font-bold text-lg tracking-tight">H</span>
            </div>
            <span className="text-xl tracking-tight text-black font-bold">Hengkyy<span className="text-gold font-medium">Trip</span></span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-1 custom-scrollbar">
          <p className="px-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Main Menu</p>
          
          <NavItem href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === "/dashboard"} />
          <NavItem href="/dashboard/bookings" icon={<CalendarDays size={18} />} label="Bookings" active={pathname === "/dashboard/bookings"} />
          <NavItem href="/dashboard/schedule" icon={<Map size={18} />} label="Tour & Schedule" active={pathname === "/dashboard/schedule"} />
          <NavItem href="/dashboard/vehicles" icon={<Car size={18} />} label="Fleet Management" active={pathname === "/dashboard/vehicles"} />
          
          <div className="py-4"></div>
          <p className="px-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Finance & Admin</p>
          
          <NavItem href="/dashboard/finance" icon={<Wallet size={18} />} label="Finance" active={pathname === "/dashboard/finance"} />
          <NavItem href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" active={pathname === "/dashboard/settings"} />
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-all group">
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 border-b border-gray-200 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center max-w-md w-full">
            <div className="relative w-full group hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors">
                <Search size={16} />
              </div>
              <input 
                type="text" 
                placeholder="Search bookings, cars, or clients..." 
                className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-black transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-black">Admin Utama</p>
                <p className="text-xs text-gray-500">admin@hengkyytrip.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center border-2 border-transparent group-hover:border-gold transition-colors overflow-hidden shadow-sm">
                <span className="text-gold text-sm font-bold tracking-tight">AU</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all font-medium ${
        active 
          ? "bg-gold/10 text-gold shadow-sm" 
          : "text-gray-500 hover:bg-gray-50 hover:text-black"
      }`}
    >
      <span className={active ? "text-gold" : "text-gray-400"}>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
