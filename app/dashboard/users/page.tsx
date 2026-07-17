import UserManagement from '@/components/users/UserManagement'

export const metadata = {
  title: 'User Management - HengkyyTrip Admin',
  description: 'Manage admin users for HengkyyTrip dashboard.',
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">User Management</h1>
          <p className="text-gray-500 text-sm">Manage administrators and their access levels.</p>
        </div>
      </div>

      <UserManagement />
    </div>
  )
}
