"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Package } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    pax: "1",
    note: ""
  })
  const { t } = useLanguage()

  useEffect(() => {
    fetch('/data/packages.json')
      .then(res => res.json())
      .then(data => {
        setPackages(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading packages:', err)
        setLoading(false)
      })
  }, [])

  const handleBookingClick = (packageItem: Package) => {
    setSelectedPackage(packageItem)
    setFormData(prev => ({ ...prev, pax: "1" }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPackage) return

    const message = `Halo HengkyyTrip, saya tertarik untuk reservasi perjalanan wisata. Berikut detail rencananya:

────── ⋆⋅☆⋅⋆ ──────
📋 *FORMULIR PEMESANAN*
────── ⋆⋅☆⋅⋆ ──────

🏔️ *Paket Wisata*
"${selectedPackage.name}"

👤 *Data Pemesan*
• Nama: ${formData.name}
• Jumlah Peserta: ${formData.pax} Orang

📅 *Jadwal Perjalanan*
• Tanggal: ${formData.date}

📝 *Catatan Tambahan*
${formData.note || "- Tidak ada catatan khusus -"}

──────────────────
Mohon informasi ketersediaan dan total biayanya. Terima kasih! ✨`

    const whatsappUrl = `https://wa.me/6285155058577?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    setSelectedPackage(null)
  }

  if (loading) {
    return (
      <section id="packages" className="py-20 bg-[var(--color-charcoal-light)]">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-[var(--color-sand)]">{t.packages.loading}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-20 bg-[var(--color-charcoal-light)] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.packages.title} <span className="text-gradient">{t.packages.titleAccent}</span>
          </h2>
          <p className="text-xl text-gray-300">{t.packages.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => handleBookingClick(pkg)}
              className="glass rounded-2xl overflow-hidden group flex flex-col h-full bg-[var(--color-charcoal)] border border-[var(--color-forest-dark)] hover:border-[var(--color-forest-teal)] transition-colors cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-3 line-clamp-2 text-white group-hover:text-[var(--color-sand)] transition-colors">
                  {pkg.name}
                </h3>

                <div className="mt-auto pt-4 border-t border-gray-800">
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">{t.packages.startFrom}</p>
                    <p className="text-xl font-bold text-[var(--color-sand)]">
                      {Number(pkg.price) === 0 || isNaN(Number(pkg.price))
                        ? t.packages.contact
                        : `Rp ${Number(pkg.price).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookingClick(pkg)
                    }}
                    className="w-full bg-[var(--color-forest-teal)] hover:bg-[var(--color-forest-dark)] text-white"
                  >
                    {t.packages.bookBtn}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#222] border border-[var(--color-forest-dark)] rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t.packages.formTitle}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Anda akan memesan: <span className="text-[var(--color-sand)] font-medium">{selectedPackage.name}</span>
                </p>

                {/* Package Description */}
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Deskripsi Paket:</h4>
                  <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {selectedPackage.description}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">{t.packages.formName}</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-forest-teal)] transition-colors"
                    placeholder="Masukkan nama anda"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{t.packages.formDate}</label>
                    <input
                      required
                      type="date"
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-forest-teal)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">{t.packages.formPax}</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={formData.pax}
                      onChange={e => setFormData({ ...formData, pax: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-forest-teal)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">{t.packages.formNote}</label>
                  <textarea
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[var(--color-forest-teal)] transition-colors min-h-[80px] resize-none"
                    placeholder="Contoh: Titik jemput, request khusus, dll"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white mt-4 font-semibold h-12"
                >
                  <span className="flex items-center gap-2">
                    {t.packages.formSubmit}
                  </span>
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  {t.packages.formFooter}
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
