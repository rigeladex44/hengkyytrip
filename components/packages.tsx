"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Package } from "@/lib/types"
import { useLanguage } from "@/lib/language-context"

import { ImageSlider } from "@/components/ui/image-slider"

function PackageImage({ pkgId, defaultImage, className }: { pkgId: string, defaultImage: string, className?: string }) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetch(`/api/images?section=packages/${pkgId}`)
      .then(res => res.json())
      .then(data => {
        if (data.images && data.images.length > 0) {
          setImages(data.images)
        } else {
          setImages([defaultImage])
        }
      })
      .catch(err => console.error("Error fetching package images:", err))
  }, [pkgId, defaultImage])

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <ImageSlider images={images.length > 0 ? images : [defaultImage]} autoPlayInterval={5000} />
    </div>
  )
}

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
    fetch('/api/tours')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mappedPackages = data.map((t: any) => ({
            id: t.id,
            name: t.title,
            price: t.price.toString(),
            duration: `${t.duration} Days`,
            pax: "1",
            description: t.description,
            image: t.imageUrl || '/placeholder.jpg'
          }))
          setPackages(mappedPackages)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading packages:', err)
        setLoading(false)
      })
  }, [])

  const handleBookingClick = (packageItem: Package) => {
    setSelectedPackage(packageItem)
    setFormData({ name: "", date: "", pax: "1", note: "" })
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
      <section id="packages" className="py-32 bg-[var(--color-charcoal)]">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse text-[var(--color-sand)] tracking-[0.2em] uppercase text-sm">{t.packages.loading}</div>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-24 md:py-32 bg-[var(--color-charcoal)] relative border-t border-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-sm text-[var(--color-sand)] uppercase tracking-[0.3em] font-bold mb-4">Curated Experiences</h2>
            <h3 className="text-4xl md:text-6xl font-serif leading-[1.1] text-white">
              {t.packages.title} <span className="italic text-gray-500">{t.packages.titleAccent}</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed hidden md:block border-l border-gray-800 pl-6">
            {t.packages.subtitle}
          </p>
        </motion.div>

        {/* Immersive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => handleBookingClick(pkg)}
              className="group cursor-pointer relative overflow-hidden aspect-[4/5] bg-gray-900 rounded-sm"
            >
              <PackageImage pkgId={pkg.id} defaultImage={pkg.image} className="opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <h4 className="text-2xl md:text-3xl font-serif text-white mb-6 leading-tight group-hover:-translate-y-2 transition-transform duration-500">
                  {pkg.name}
                </h4>
                
                <div className="flex items-center justify-between opacity-90 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 delay-75 border-t border-white/20 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">{t.packages.startFrom}</p>
                    <p className="text-lg font-bold text-[var(--color-sand)] font-serif tracking-wide">
                      {Number(pkg.price) === 0 || isNaN(Number(pkg.price))
                        ? t.packages.contact
                        : `Rp ${Number(pkg.price).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[var(--color-sand)] group-hover:border-[var(--color-sand)] group-hover:text-black transition-colors backdrop-blur-sm text-white">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Elegant Editorial Booking Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-6 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[85vh] bg-[var(--color-charcoal)] md:border border-gray-800 flex flex-col md:flex-row overflow-hidden rounded-t-3xl md:rounded-xl md:shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute right-4 top-4 md:right-6 md:top-6 text-white hover:text-[var(--color-sand)] z-20 bg-black/50 md:bg-transparent rounded-full p-2 md:p-0 transition-colors"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Modal Image (Top on Mobile, Left on Desktop) */}
              <div className="w-full md:w-[45%] h-[35vh] md:h-auto md:min-h-[600px] relative shrink-0">
                <PackageImage pkgId={selectedPackage.id} defaultImage={selectedPackage.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] md:from-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                   <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight drop-shadow-lg">{selectedPackage.name}</h3>
                </div>
              </div>

              {/* Form Section */}
              <div className="w-full md:w-[55%] p-6 md:p-12 flex flex-col overflow-y-auto hide-scrollbar">
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Reservation</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {selectedPackage.description}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
                  <div className="relative">
                    <input
                      required
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="block px-0 pb-2 pt-5 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-sand)] peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{t.packages.formName}</label>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        required
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="block px-0 pb-2 pt-5 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-sand)] peer"
                      />
                      <label htmlFor="date" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-4">{t.packages.formDate}</label>
                    </div>
                    <div className="relative">
                      <input
                        required
                        type="number"
                        min="1"
                        id="pax"
                        value={formData.pax}
                        onChange={e => setFormData({ ...formData, pax: e.target.value })}
                        className="block px-0 pb-2 pt-5 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-sand)] peer"
                        placeholder=" "
                      />
                      <label htmlFor="pax" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{t.packages.formPax}</label>
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      id="note"
                      value={formData.note}
                      onChange={e => setFormData({ ...formData, note: e.target.value })}
                      className="block px-0 pb-2 pt-5 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-[var(--color-sand)] peer min-h-[60px] resize-none"
                      placeholder=" "
                    />
                    <label htmlFor="note" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">{t.packages.formNote}</label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-[var(--color-sand)] h-14 uppercase tracking-widest text-xs font-bold mt-4"
                  >
                    {t.packages.formSubmit}
                  </Button>
                  
                  <p className="text-[10px] text-center text-gray-600 uppercase tracking-wider mt-4">
                    {t.packages.formFooter}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
