"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Budi Santoso",
    location: "Jakarta",
    rating: 5,
    comment: "Pelayanan sangat memuaskan! Mobil Alphard-nya bersih dan wangi. Driver juga sangat sopan dan on-time. Recommended banget buat yang butuh sewa mobil premium di Malang.",
  },
  {
    name: "Siti Nurhaliza",
    location: "Surabaya",
    rating: 5,
    comment: "Paket wisata Bromo-nya juara! Jeep-nya bagus, guide-nya asik diajak ngobrol. Pemandangannya gila keren banget. Thanks BromoTrip!",
  },
  {
    name: "Ahmad Rizki",
    location: "Bandung",
    rating: 5,
    comment: "Trip ke Ijen Blue Fire sangat berkesan. Pemandu lokal sangat membantu dan profesional. Pengalaman yang tak terlupakan!",
  },
  {
    name: "Dewi Lestari",
    location: "Yogyakarta",
    rating: 5,
    comment: "Mobil bersih, driver ramah dan sangat membantu. Perjalanan ke Bromo jadi lebih menyenangkan. Highly recommended!",
  },
]

import { useLanguage } from "@/lib/language-context"

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="py-20 bg-[var(--color-charcoal-light)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t.testimonials.title} <span className="text-gradient">{t.testimonials.titleAccent}</span>
          </h2>
          <p className="text-xl text-gray-300">{t.testimonials.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-2xl bg-[var(--color-charcoal)] border border-[var(--color-forest-dark)]"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--color-sand)] text-[var(--color-sand)]" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">&quot;{testimonial.comment}&quot;</p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
