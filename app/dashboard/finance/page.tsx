import FinanceOverview from '@/components/finance/FinanceOverview'

export const metadata = {
  title: 'Finance Overview - HengkyyTrip Admin',
  description: 'View revenue and financial statistics.',
}

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">Financial Report</h1>
          <p className="text-gray-500 text-sm">Real-time revenue metrics based on your bookings.</p>
        </div>
      </div>

      <FinanceOverview />
    </div>
  )
}
