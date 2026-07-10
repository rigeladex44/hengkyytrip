import SettingsForm from '@/components/settings/SettingsForm'

export const metadata = {
  title: 'Settings - HengkyyTrip Admin',
  description: 'Manage admin profile and preferences.',
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your administrator account details securely.</p>
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        <SettingsForm />
      </div>
    </div>
  )
}
