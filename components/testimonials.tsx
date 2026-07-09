"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

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
    comment: "Paket wisata Bromo-nya juara! Jeep-nya bagus, guide-nya asik diajak ngobrol. Pemandangannya gila keren banget. Thanks HengkyyTrip!",
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

export default function Testimonials() {
  const { t } = useLanguage()

  // Double the array to ensure smooth infinite scrolling
  const scrollItems = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[var(--color-charcoal)] relative overflow-hidden border-t border-gray-900">
      <div className="container mx-auto px-6 mb-16 md:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-4 text-gray-500">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-serif leading-[1.1] text-white">
            {t.testimonials.title} <span className="italic text-[var(--color-sand)]">{t.testimonials.titleAccent}</span>
          </h3>
        </motion.div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full flex overflow-x-hidden">
         {/* Gradient Masks for smooth fade out at edges */}
         <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-charcoal)] to-transparent z-10 hidden md:block"></div>
         <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-charcoal)] to-transparent z-10 hidden md:block"></div>

         <motion.div
            className="flex gap-6 md:gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25 // Adjust for speed
            }}
            style={{ width: "fit-content" }}
         >
           {scrollItems.map((testimonial, index) => (
             <div
               key={`${testimonial.name}-${index}`}
               className="w-[300px] md:w-[450px] flex-shrink-0 glass-dark p-8 md:p-10 border border-gray-800 flex flex-col justify-between group hover:border-gray-600 transition-colors"
             >
               <div>
                 <div className="flex gap-1 mb-6">
                   {[...Array(testimonial.rating)].map((_, i) => (
                     <Star key={i} className="h-4 w-4 fill-[var(--color-sand)] text-[var(--color-sand)] opacity-70 group-hover:opacity-100 transition-opacity" />
                   ))}
                 </div>
                 <p className="text-lg md:text-xl text-gray-300 font-serif italic leading-relaxed mb-8">
                   "{testimonial.comment}"
                 </p>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[var(--color-sand)] font-serif text-xl border border-gray-700">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm tracking-wider uppercase">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{testimonial.location}</p>
                  </div>
               </div>
             </div>
           ))}
         </motion.div>
      </div>
    </section>
  )
}
